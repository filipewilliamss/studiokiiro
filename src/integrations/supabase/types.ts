export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      briefing_responses: {
        Row: {
          id: string
          project_id: string
          responses: Json
          submitted_at: string
        }
        Insert: {
          id?: string
          project_id: string
          responses?: Json
          submitted_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          responses?: Json
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "briefing_responses_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      client_credentials: {
        Row: {
          client_name: string
          created_at: string | null
          id: string
          password: string
          updated_at: string | null
          username: string
        }
        Insert: {
          client_name: string
          created_at?: string | null
          id?: string
          password: string
          updated_at?: string | null
          username: string
        }
        Update: {
          client_name?: string
          created_at?: string | null
          id?: string
          password?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      fixed_costs: {
        Row: {
          created_at: string
          id: string
          name: string
          sort_order: number
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          sort_order?: number
          value?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          sort_order?: number
          value?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          project_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          project_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          project_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_goals: {
        Row: {
          created_at: string
          id: string
          month: string
          profit_goal: number
          revenue_goal: number
          tax_rate: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          month: string
          profit_goal?: number
          revenue_goal?: number
          tax_rate?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          month?: string
          profit_goal?: number
          revenue_goal?: number
          tax_rate?: number
          updated_at?: string
        }
        Relationships: []
      }
      partner_goals: {
        Row: {
          created_at: string
          goal_amount: number
          id: string
          month: string
          partner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          goal_amount?: number
          id?: string
          month: string
          partner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          goal_amount?: number
          id?: string
          month?: string
          partner_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          budget_total: number
          commission_amount: number
          commission_paid_date: string | null
          commission_paid_to_partner: boolean
          commission_rate: number
          created_at: string
          freelancer_cost: number | null
          has_commission: boolean
          id: string
          initial_payment: number | null
          initial_payment_date: string | null
          installments_paid: number | null
          installments_total: number | null
          next_payment_date: string | null
          notes: string | null
          other_costs: number | null
          payment_fees_amount: number | null
          payment_fees_pct: number | null
          payment_method: string | null
          payment_status: string | null
          project_id: string
          remaining_amount: number | null
          sale_date: string | null
          sales_rep: string | null
          service_price_id: string | null
          updated_at: string
        }
        Insert: {
          budget_total?: number
          commission_amount?: number
          commission_paid_date?: string | null
          commission_paid_to_partner?: boolean
          commission_rate?: number
          created_at?: string
          freelancer_cost?: number | null
          has_commission?: boolean
          id?: string
          initial_payment?: number | null
          initial_payment_date?: string | null
          installments_paid?: number | null
          installments_total?: number | null
          next_payment_date?: string | null
          notes?: string | null
          other_costs?: number | null
          payment_fees_amount?: number | null
          payment_fees_pct?: number | null
          payment_method?: string | null
          payment_status?: string | null
          project_id: string
          remaining_amount?: number | null
          sale_date?: string | null
          sales_rep?: string | null
          service_price_id?: string | null
          updated_at?: string
        }
        Update: {
          budget_total?: number
          commission_amount?: number
          commission_paid_date?: string | null
          commission_paid_to_partner?: boolean
          commission_rate?: number
          created_at?: string
          freelancer_cost?: number | null
          has_commission?: boolean
          id?: string
          initial_payment?: number | null
          initial_payment_date?: string | null
          installments_paid?: number | null
          installments_total?: number | null
          next_payment_date?: string | null
          notes?: string | null
          other_costs?: number | null
          payment_fees_amount?: number | null
          payment_fees_pct?: number | null
          payment_method?: string | null
          payment_status?: string | null
          project_id?: string
          remaining_amount?: number | null
          sale_date?: string | null
          sales_rep?: string | null
          service_price_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_service_price_id_fkey"
            columns: ["service_price_id"]
            isOneToOne: false
            referencedRelation: "service_prices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          client_type: string | null
          company: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          client_type?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          client_type?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_feedbacks: {
        Row: {
          client_id: string
          content: string
          created_at: string
          id: string
          project_id: string
          stage_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          content: string
          created_at?: string
          id?: string
          project_id: string
          stage_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          content?: string
          created_at?: string
          id?: string
          project_id?: string
          stage_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_feedbacks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_feedbacks_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "project_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      project_stages: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          id: string
          internal_tasks: Json | null
          name: string
          project_id: string
          sort_order: number
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          internal_tasks?: Json | null
          name: string
          project_id: string
          sort_order?: number
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          internal_tasks?: Json | null
          name?: string
          project_id?: string
          sort_order?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_stages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          client_id: string
          created_at: string
          deadline: string | null
          description: string | null
          health_status: string | null
          id: string
          name: string
          partner_message: string | null
          partner_notes: string | null
          priority: string
          progress: number
          start_date: string | null
          status: string
          studio_observation: string | null
          type: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          deadline?: string | null
          description?: string | null
          health_status?: string | null
          id?: string
          name: string
          partner_message?: string | null
          partner_notes?: string | null
          priority?: string
          progress?: number
          start_date?: string | null
          status?: string
          studio_observation?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          deadline?: string | null
          description?: string | null
          health_status?: string | null
          id?: string
          name?: string
          partner_message?: string | null
          partner_notes?: string | null
          priority?: string
          progress?: number
          start_date?: string | null
          status?: string
          studio_observation?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "partner_client_names"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_rejections: {
        Row: {
          client_id: string
          comment: string | null
          created_at: string
          decision_factor: string | null
          id: string
          quote_id: string
          reason: string
        }
        Insert: {
          client_id: string
          comment?: string | null
          created_at?: string
          decision_factor?: string | null
          id?: string
          quote_id: string
          reason: string
        }
        Update: {
          client_id?: string
          comment?: string | null
          created_at?: string
          decision_factor?: string | null
          id?: string
          quote_id?: string
          reason?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_rejections_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "partner_client_names"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_rejections_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_rejections_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          admin_confirmed: boolean
          client_id: string
          client_response_at: string | null
          created_at: string
          description: string | null
          estimated_margin: number | null
          id: string
          items: Json
          notes: string | null
          payment_terms: string | null
          project_type: string
          sequential_number: number
          status: string
          sub_status: string | null
          total_value: number
          validity_date: string | null
        }
        Insert: {
          admin_confirmed?: boolean
          client_id: string
          client_response_at?: string | null
          created_at?: string
          description?: string | null
          estimated_margin?: number | null
          id?: string
          items?: Json
          notes?: string | null
          payment_terms?: string | null
          project_type?: string
          sequential_number?: number
          status?: string
          sub_status?: string | null
          total_value?: number
          validity_date?: string | null
        }
        Update: {
          admin_confirmed?: boolean
          client_id?: string
          client_response_at?: string | null
          created_at?: string
          description?: string | null
          estimated_margin?: number | null
          id?: string
          items?: Json
          notes?: string | null
          payment_terms?: string | null
          project_type?: string
          sequential_number?: number
          status?: string
          sub_status?: string | null
          total_value?: number
          validity_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "partner_client_names"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_goals: {
        Row: {
          created_at: string
          goal_amount: number
          id: string
          month: string
          service_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          goal_amount?: number
          id?: string
          month: string
          service_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          goal_amount?: number
          id?: string
          month?: string
          service_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_orders: {
        Row: {
          client_id: string
          created_at: string
          deadline: string | null
          description: string | null
          id: string
          items: Json
          notes: string | null
          payment_terms: string | null
          project_id: string | null
          sequential_number: number
          service_type: string
          status: string
          terms_conditions: string | null
          total_value: number
        }
        Insert: {
          client_id: string
          created_at?: string
          deadline?: string | null
          description?: string | null
          id?: string
          items?: Json
          notes?: string | null
          payment_terms?: string | null
          project_id?: string | null
          sequential_number?: number
          service_type?: string
          status?: string
          terms_conditions?: string | null
          total_value?: number
        }
        Update: {
          client_id?: string
          created_at?: string
          deadline?: string | null
          description?: string | null
          id?: string
          items?: Json
          notes?: string | null
          payment_terms?: string | null
          project_id?: string | null
          sequential_number?: number
          service_type?: string
          status?: string
          terms_conditions?: string | null
          total_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "service_orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "partner_client_names"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_orders_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      service_prices: {
        Row: {
          category: string
          created_at: string
          current_price: number
          id: string
          name: string
          sort_order: number
          target_price: number
        }
        Insert: {
          category: string
          created_at?: string
          current_price?: number
          id?: string
          name: string
          sort_order?: number
          target_price?: number
        }
        Update: {
          category?: string
          created_at?: string
          current_price?: number
          id?: string
          name?: string
          sort_order?: number
          target_price?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      client_payments_view: {
        Row: {
          budget_total: number | null
          created_at: string | null
          id: string | null
          initial_payment: number | null
          initial_payment_date: string | null
          installments_paid: number | null
          installments_total: number | null
          next_payment_date: string | null
          payment_method: string | null
          payment_status: string | null
          project_id: string | null
          remaining_amount: number | null
          sale_date: string | null
          updated_at: string | null
        }
        Insert: {
          budget_total?: number | null
          created_at?: string | null
          id?: string | null
          initial_payment?: number | null
          initial_payment_date?: string | null
          installments_paid?: number | null
          installments_total?: number | null
          next_payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          project_id?: string | null
          remaining_amount?: number | null
          sale_date?: string | null
          updated_at?: string | null
        }
        Update: {
          budget_total?: number | null
          created_at?: string | null
          id?: string | null
          initial_payment?: number | null
          initial_payment_date?: string | null
          installments_paid?: number | null
          installments_total?: number | null
          next_payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          project_id?: string | null
          remaining_amount?: number | null
          sale_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_client_names: {
        Row: {
          company: string | null
          full_name: string | null
          id: string | null
        }
        Insert: {
          company?: string | null
          full_name?: string | null
          id?: string | null
        }
        Update: {
          company?: string | null
          full_name?: string | null
          id?: string | null
        }
        Relationships: []
      }
      partner_payments_view: {
        Row: {
          commission_amount: number | null
          commission_paid_date: string | null
          commission_paid_to_partner: boolean | null
          id: string | null
          project_id: string | null
          sale_date: string | null
          sales_rep: string | null
        }
        Insert: {
          commission_amount?: number | null
          commission_paid_date?: string | null
          commission_paid_to_partner?: boolean | null
          id?: string | null
          project_id?: string | null
          sale_date?: string | null
          sales_rep?: string | null
        }
        Update: {
          commission_amount?: number | null
          commission_paid_date?: string | null
          commission_paid_to_partner?: boolean | null
          id?: string | null
          project_id?: string | null
          sale_date?: string | null
          sales_rep?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      respond_to_quote: {
        Args: { p_quote_id: string; p_status: string }
        Returns: undefined
      }
      update_updated_at_column: { Args: never; Returns: boolean }
      verify_client_credentials: {
        Args: { p_password: string; p_username: string }
        Returns: {
          client_name: string
          email: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "client" | "partner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "client", "partner"],
    },
  },
} as const
