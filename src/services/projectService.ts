import { supabase } from "@/integrations/supabase/client";

export interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  deadline: string | null;
  description?: string | null;
}

export interface Stage {
  id: string;
  name: string;
  status: string;
  sort_order: number;
  description: string | null;
  completed_at: string | null;
}

export interface ProjectFile {
  name: string;
  viewUrl: string | null;
  downloadUrl: string | null;
}

export interface Payment {
  id: string;
  project_id: string;
  budget_total: number;
  initial_payment: number | null;
  initial_payment_date: string | null;
  remaining_amount: number | null;
  installments_total: number | null;
  installments_paid: number | null;
  next_payment_date: string | null;
  notes: string | null;
  payment_status: string | null;
}

export interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface ProjectDetails {
  stages: Stage[];
  files: ProjectFile[];
  payment: Payment | null;
  messages: Message[];
  briefingToken: string | null;
  briefingSubmitted: boolean;
  briefingResponses: Record<string, string> | null;
}

/**
 * Deep module encapsulating project-related data fetching and mutations.
 */
export const projectService = {
  /**
   * Fetches projects for the current client.
   */
  async fetchClientProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projects")
      .select("id, name, type, status, progress, deadline, description")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching client projects:", error);
      return [];
    }
    return data || [];
  },

  /**
   * Loads all details for a specific project concurrently.
   */
  async fetchProjectDetails(projectId: string): Promise<ProjectDetails> {
    const [stagesRes, filesListRes, paymentRes, messagesRes, briefingRes, briefingLinkRes] =
      await Promise.all([
        supabase.from("project_stages").select("*").eq("project_id", projectId).order("sort_order"),
        supabase.storage.from("project-files").list(projectId),
        supabase.from("client_payments_view" as any).select("*").eq("project_id", projectId).maybeSingle(),
        supabase.from("messages").select("*").eq("project_id", projectId).order("created_at", { ascending: true }),
        supabase.from("briefing_responses").select("responses").eq("project_id", projectId).maybeSingle(),
        supabase.from("briefing_links").select("token, submitted_at").eq("project_id", projectId).maybeSingle(),
      ]);

    // Generate signed URLs for files
    let files: ProjectFile[] = [];
    if (filesListRes.data && filesListRes.data.length > 0) {
      files = await Promise.all(
        filesListRes.data.map(async (file) => {
          const objectPath = `${projectId}/${file.name}`;
          const [viewRes, downloadRes] = await Promise.all([
            supabase.storage.from("project-files").createSignedUrl(objectPath, 3600),
            supabase.storage.from("project-files").createSignedUrl(objectPath, 3600, { download: file.name }),
          ]);
          return {
            name: file.name,
            viewUrl: viewRes.data?.signedUrl ?? null,
            downloadUrl: downloadRes.data?.signedUrl ?? null,
          };
        })
      );
    }

    const briefingSubmitted = Boolean(briefingRes.data?.responses || briefingLinkRes.data?.submitted_at);
    const briefingResponses = (briefingRes.data?.responses as Record<string, string>) || null;
    const briefingToken = briefingLinkRes.data?.token || null;

    return {
      stages: stagesRes.data || [],
      files,
      payment: (paymentRes.data as any) || null,
      messages: messagesRes.data || [],
      briefingToken,
      briefingSubmitted,
      briefingResponses,
    };
  },

  /**
   * Submits feedback for a project stage during review.
   */
  async submitStageFeedback(projectId: string, stageId: string | undefined, clientId: string, content: string): Promise<boolean> {
    const { error } = await supabase.from("project_feedbacks").insert({
      project_id: projectId,
      stage_id: stageId,
      client_id: clientId,
      content,
    });
    return !error;
  },

  /**
   * Submits answers for a project briefing.
   */
  async submitBriefing(projectId: string, responses: Record<string, string>): Promise<boolean> {
    const { error } = await supabase.from("briefing_responses").insert({
      project_id: projectId,
      responses,
    });
    return !error;
  },

  /**
   * Sends a message in the project conversation.
   */
  async sendMessage(projectId: string, senderId: string, content: string): Promise<boolean> {
    const { error } = await supabase.from("messages").insert({
      project_id: projectId,
      sender_id: senderId,
      content,
    });
    return !error;
  },
};
