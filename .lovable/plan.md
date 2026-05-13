I have identified several issues causing data to not appear in the Admin Dashboard:

1.  **Status Mismatch**: The dashboard summary was filtering for project statuses that do not exist in your database (e.g., "em_andamento" instead of "producao").
2.  **Query Syntax Error**: A syntax error in the client list query was preventing the list from loading.
3.  **Finance Filtering**: The finance tab defaults to the current month, but most of your data is from previous months.
4.  **Database Security (RLS)**: Row Level Security is currently preventing your "mock admin" login from seeing data because it's not a real Supabase Auth account.

### Implementation Plan

**Frontend Fixes:**
- Update `AdminDashboard.tsx` to count projects with all active statuses (`producao`, `planejamento`, `briefing`, etc.).
- Fix the syntax error in `ClientsTab.tsx` when excluding admin/partner users.
- Improve `FinanceTab.tsx` to better handle month filtering.

**Database Fixes:**
- I will prepare a migration to ensure the Admin role (even when using the mock login) has proper permissions to view all data.
- I will adjust the project statuses to be consistent between the code and the database.

**Refinement:**
- Verify that the summary cards show correct numbers.
- Ensure all tabs (Clients, Projects, Finance) display their respective data correctly.

### Technical Details

- **AdminDashboard.tsx**: Update the `.in("status", [...])` filter to include `briefing`, `planejamento`, `producao`, `revisao`, and `finalizacao`.
- **ClientsTab.tsx**: Change `.not("user_id", "in", \`(\${excludeIds.join(",")})\`)` to `.not("user_id", "in", excludeIds)`.
- **Database**: Add RLS policies that allow the mock admin ID (`00000000-0000-0000-0000-000000000001`) to bypass standard checks, or temporarily disable RLS for administrative tables while you use the custom login system.
