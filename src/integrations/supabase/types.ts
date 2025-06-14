export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      advertisements: {
        Row: {
          adults: number | null
          children: number | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          people_range: string | null
          price: string | null
          priority: number | null
          services: Json | null
          status: string | null
          title: string
          type: string | null
          whatsapp_message: string | null
        }
        Insert: {
          adults?: number | null
          children?: number | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          people_range?: string | null
          price?: string | null
          priority?: number | null
          services?: Json | null
          status?: string | null
          title: string
          type?: string | null
          whatsapp_message?: string | null
        }
        Update: {
          adults?: number | null
          children?: number | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          people_range?: string | null
          price?: string | null
          priority?: number | null
          services?: Json | null
          status?: string | null
          title?: string
          type?: string | null
          whatsapp_message?: string | null
        }
        Relationships: []
      }
      booking_files: {
        Row: {
          booking_id: string
          created_at: string
          file_name: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          mime_type: string | null
          uploaded_at: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          file_name: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          mime_type?: string | null
          uploaded_at?: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          mime_type?: string | null
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_files_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          additional_services: Json | null
          adults: number
          arrival_airport: string | null
          arrival_date: string
          budget: number | null
          car_type: string | null
          children: Json | null
          created_at: string | null
          currency: string | null
          customer_name: string
          departure_airport: string | null
          departure_date: string
          discount_amount: number | null
          discount_coupon: string | null
          id: string
          phone_number: string | null
          reference_number: string
          room_types: Json | null
          rooms: number
          selected_cities: Json | null
          status: string | null
          total_cost: number | null
          updated_at: string | null
        }
        Insert: {
          additional_services?: Json | null
          adults?: number
          arrival_airport?: string | null
          arrival_date: string
          budget?: number | null
          car_type?: string | null
          children?: Json | null
          created_at?: string | null
          currency?: string | null
          customer_name: string
          departure_airport?: string | null
          departure_date: string
          discount_amount?: number | null
          discount_coupon?: string | null
          id?: string
          phone_number?: string | null
          reference_number: string
          room_types?: Json | null
          rooms?: number
          selected_cities?: Json | null
          status?: string | null
          total_cost?: number | null
          updated_at?: string | null
        }
        Update: {
          additional_services?: Json | null
          adults?: number
          arrival_airport?: string | null
          arrival_date?: string
          budget?: number | null
          car_type?: string | null
          children?: Json | null
          created_at?: string | null
          currency?: string | null
          customer_name?: string
          departure_airport?: string | null
          departure_date?: string
          discount_amount?: number | null
          discount_coupon?: string | null
          id?: string
          phone_number?: string | null
          reference_number?: string
          room_types?: Json | null
          rooms?: number
          selected_cities?: Json | null
          status?: string | null
          total_cost?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cities: {
        Row: {
          available_tours: Json | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          tour_prices: Json | null
        }
        Insert: {
          available_tours?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          tour_prices?: Json | null
        }
        Update: {
          available_tours?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          tour_prices?: Json | null
        }
        Relationships: []
      }
      discount_code_usage: {
        Row: {
          booking_id: string | null
          discount_code_id: string | null
          id: string
          used_at: string | null
        }
        Insert: {
          booking_id?: string | null
          discount_code_id?: string | null
          id?: string
          used_at?: string | null
        }
        Update: {
          booking_id?: string | null
          discount_code_id?: string | null
          id?: string
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discount_code_usage_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discount_code_usage_discount_code_id_fkey"
            columns: ["discount_code_id"]
            isOneToOne: false
            referencedRelation: "discount_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      discount_codes: {
        Row: {
          code: string
          created_at: string | null
          current_uses: number | null
          discount_percentage: number
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          current_uses?: number | null
          discount_percentage: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          current_uses?: number | null
          discount_percentage?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          is_active: boolean | null
          order_index: number | null
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      geographic_locations: {
        Row: {
          address: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          images: Json | null
          latitude: number
          location_type: string | null
          longitude: number
          metadata: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          latitude: number
          location_type?: string | null
          longitude: number
          metadata?: Json | null
          name: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          latitude?: number
          location_type?: string | null
          longitude?: number
          metadata?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      hotels: {
        Row: {
          amenities: Json | null
          city: string
          created_at: string | null
          distance_from_center: number | null
          double_view_price: number | null
          double_without_view_price: number | null
          id: string
          is_active: boolean | null
          name: string
          rating: number | null
          single_price: number | null
          single_view_price: number | null
          triple_view_price: number | null
          triple_without_view_price: number | null
        }
        Insert: {
          amenities?: Json | null
          city: string
          created_at?: string | null
          distance_from_center?: number | null
          double_view_price?: number | null
          double_without_view_price?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          rating?: number | null
          single_price?: number | null
          single_view_price?: number | null
          triple_view_price?: number | null
          triple_without_view_price?: number | null
        }
        Update: {
          amenities?: Json | null
          city?: string
          created_at?: string | null
          distance_from_center?: number | null
          double_view_price?: number | null
          double_without_view_price?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          rating?: number | null
          single_price?: number | null
          single_view_price?: number | null
          triple_view_price?: number | null
          triple_without_view_price?: number | null
        }
        Relationships: []
      }
      location_analysis: {
        Row: {
          accessibility_score: number | null
          analysis_date: string
          climate_zone: string | null
          cover_availability: string | null
          created_at: string
          elevation: number | null
          id: string
          location_id: string
          metadata: Json | null
          strategic_importance: string | null
          terrain_type: string | null
          threat_level: string | null
          updated_at: string
          urban_density: number | null
          vegetation_index: number | null
          visibility_score: number | null
          water_proximity: number | null
        }
        Insert: {
          accessibility_score?: number | null
          analysis_date?: string
          climate_zone?: string | null
          cover_availability?: string | null
          created_at?: string
          elevation?: number | null
          id?: string
          location_id: string
          metadata?: Json | null
          strategic_importance?: string | null
          terrain_type?: string | null
          threat_level?: string | null
          updated_at?: string
          urban_density?: number | null
          vegetation_index?: number | null
          visibility_score?: number | null
          water_proximity?: number | null
        }
        Update: {
          accessibility_score?: number | null
          analysis_date?: string
          climate_zone?: string | null
          cover_availability?: string | null
          created_at?: string
          elevation?: number | null
          id?: string
          location_id?: string
          metadata?: Json | null
          strategic_importance?: string | null
          terrain_type?: string | null
          threat_level?: string | null
          updated_at?: string
          urban_density?: number | null
          vegetation_index?: number | null
          visibility_score?: number | null
          water_proximity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "location_analysis_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "geographic_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      location_auto_images: {
        Row: {
          capture_date: string
          created_at: string
          id: string
          image_type: string
          image_url: string
          location_id: string
          metadata: Json | null
          resolution: string | null
          time_of_day: string | null
          weather_conditions: string | null
        }
        Insert: {
          capture_date?: string
          created_at?: string
          id?: string
          image_type?: string
          image_url: string
          location_id: string
          metadata?: Json | null
          resolution?: string | null
          time_of_day?: string | null
          weather_conditions?: string | null
        }
        Update: {
          capture_date?: string
          created_at?: string
          id?: string
          image_type?: string
          image_url?: string
          location_id?: string
          metadata?: Json | null
          resolution?: string | null
          time_of_day?: string | null
          weather_conditions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "location_auto_images_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "geographic_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      location_images: {
        Row: {
          capture_date: string | null
          created_at: string
          file_size: number | null
          id: string
          image_name: string | null
          image_type: string | null
          image_url: string
          location_id: string | null
          metadata: Json | null
          mime_type: string | null
          uploaded_by: string | null
        }
        Insert: {
          capture_date?: string | null
          created_at?: string
          file_size?: number | null
          id?: string
          image_name?: string | null
          image_type?: string | null
          image_url: string
          location_id?: string | null
          metadata?: Json | null
          mime_type?: string | null
          uploaded_by?: string | null
        }
        Update: {
          capture_date?: string | null
          created_at?: string
          file_size?: number | null
          id?: string
          image_name?: string | null
          image_type?: string | null
          image_url?: string
          location_id?: string | null
          metadata?: Json | null
          mime_type?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "location_images_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "geographic_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      location_timeline_events: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          event_date: string
          event_type: string
          id: string
          location_id: string | null
          metadata: Json | null
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string
          event_type: string
          id?: string
          location_id?: string | null
          metadata?: Json | null
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string
          event_type?: string
          id?: string
          location_id?: string | null
          metadata?: Json | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_timeline_events_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "geographic_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      map_drawings: {
        Row: {
          coordinates: Json
          created_at: string
          created_by: string | null
          description: string | null
          drawing_type: string
          id: string
          location_id: string | null
          metadata: Json | null
          style_properties: Json | null
          title: string | null
        }
        Insert: {
          coordinates: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          drawing_type?: string
          id?: string
          location_id?: string | null
          metadata?: Json | null
          style_properties?: Json | null
          title?: string | null
        }
        Update: {
          coordinates?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          drawing_type?: string
          id?: string
          location_id?: string | null
          metadata?: Json | null
          style_properties?: Json | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "map_drawings_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "geographic_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          email: string
          id: string
          is_active: boolean
          last_login: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: string | null
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email: string
          id: string
          is_active?: boolean
          last_login?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      saved_locations: {
        Row: {
          created_at: string
          id: string
          is_favorite: boolean | null
          location_id: string
          notes: string | null
          priority_level: number | null
          saved_date: string
          tags: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_favorite?: boolean | null
          location_id: string
          notes?: string | null
          priority_level?: number | null
          saved_date?: string
          tags?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_favorite?: boolean | null
          location_id?: string
          notes?: string | null
          priority_level?: number | null
          saved_date?: string
          tags?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_locations_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "geographic_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number
          project_id: string | null
          type: string
          unit: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price: number
          project_id?: string | null
          type: string
          unit?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number
          project_id?: string | null
          type?: string
          unit?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      special_services: {
        Row: {
          base_service_id: string | null
          color: string | null
          created_at: string | null
          description: string | null
          detailed_description: string | null
          display_order: number | null
          features: Json | null
          icon: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          name: string
          project_id: string | null
          project_types: Json | null
          updated_at: string | null
        }
        Insert: {
          base_service_id?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          detailed_description?: string | null
          display_order?: number | null
          features?: Json | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          name: string
          project_id?: string | null
          project_types?: Json | null
          updated_at?: string | null
        }
        Update: {
          base_service_id?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          detailed_description?: string | null
          display_order?: number | null
          features?: Json | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          name?: string
          project_id?: string | null
          project_types?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "special_services_base_service_id_fkey"
            columns: ["base_service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          category: string
          created_at: string | null
          data_type: string | null
          description: string | null
          id: string
          is_public: boolean | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          category: string
          created_at?: string | null
          data_type?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          category?: string
          created_at?: string | null
          data_type?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      transport: {
        Row: {
          capacity: string | null
          created_at: string | null
          daily_price: number
          farewell_different_city_price: number | null
          farewell_same_city_price: number | null
          id: string
          is_active: boolean | null
          reception_different_city_price: number | null
          reception_same_city_price: number | null
          type: string
        }
        Insert: {
          capacity?: string | null
          created_at?: string | null
          daily_price: number
          farewell_different_city_price?: number | null
          farewell_same_city_price?: number | null
          id?: string
          is_active?: boolean | null
          reception_different_city_price?: number | null
          reception_same_city_price?: number | null
          type: string
        }
        Update: {
          capacity?: string | null
          created_at?: string | null
          daily_price?: number
          farewell_different_city_price?: number | null
          farewell_same_city_price?: number | null
          id?: string
          is_active?: boolean | null
          reception_different_city_price?: number | null
          reception_same_city_price?: number | null
          type?: string
        }
        Relationships: []
      }
      web_applications: {
        Row: {
          client_name: string | null
          completion_date: string | null
          created_at: string
          description: string
          display_order: number | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          is_visible: boolean | null
          project_url: string | null
          status: string | null
          technologies: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          client_name?: string | null
          completion_date?: string | null
          created_at?: string
          description: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_visible?: boolean | null
          project_url?: string | null
          status?: string | null
          technologies?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          client_name?: string | null
          completion_date?: string | null
          created_at?: string
          description?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_visible?: boolean | null
          project_url?: string | null
          status?: string | null
          technologies?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      website_projects: {
        Row: {
          client_name: string | null
          completion_date: string | null
          created_at: string
          description: string
          display_order: number | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          is_visible: boolean | null
          project_url: string | null
          status: string | null
          technologies: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          client_name?: string | null
          completion_date?: string | null
          created_at?: string
          description: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_visible?: boolean | null
          project_url?: string | null
          status?: string | null
          technologies?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          client_name?: string | null
          completion_date?: string | null
          created_at?: string
          description?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_visible?: boolean | null
          project_url?: string | null
          status?: string | null
          technologies?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      whatsapp_contacts: {
        Row: {
          contact_time: string
          created_at: string
          employee_name: string
          id: string
          ip_address: string | null
          page_url: string | null
          user_agent: string | null
          visitor_location: string | null
        }
        Insert: {
          contact_time?: string
          created_at?: string
          employee_name: string
          id?: string
          ip_address?: string | null
          page_url?: string | null
          user_agent?: string | null
          visitor_location?: string | null
        }
        Update: {
          contact_time?: string
          created_at?: string
          employee_name?: string
          id?: string
          ip_address?: string | null
          page_url?: string | null
          user_agent?: string | null
          visitor_location?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      log_activity: {
        Args: {
          p_action: string
          p_resource_type?: string
          p_resource_id?: string
          p_details?: Json
        }
        Returns: undefined
      }
      update_user_last_login: {
        Args: { user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      user_role: "admin" | "moderator" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "moderator", "editor", "viewer"],
    },
  },
} as const
