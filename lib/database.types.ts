export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          is_new_user: boolean | null
          name: string
          timezone: string | null
          username: string
        }
        Insert: {
          id: string
          is_new_user?: boolean | null
          name: string
          timezone?: string | null
          username: string
        }
        Update: {
          id?: string
          is_new_user?: boolean | null
          name?: string
          timezone?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
