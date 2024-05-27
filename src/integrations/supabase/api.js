import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch events
export const useFetchEvents = () => {
  return useQuery('events', async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) throw new Error(error.message);
    return data;
  });
};

// Add event
export const useAddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newEvent) => {
      const { data, error } = await supabase.from('events').insert(newEvent);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
      },
    }
  );
};

// Update event
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (updatedEvent) => {
      const { data, error } = await supabase.from('events').update(updatedEvent).eq('id', updatedEvent.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
      },
    }
  );
};

// Delete event
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (eventId) => {
      const { data, error } = await supabase.from('events').delete().eq('id', eventId);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
      },
    }
  );
};

// Document types and info about relations based on openapi.json
/**
 * Event type definition
 * @typedef {Object} Event
 * @property {number} id - The unique identifier for the event.
 * @property {string} created_at - The timestamp when the event was created.
 * @property {string} name - The name of the event.
 * @property {string} date - The date of the event.
 * @property {string} description - The description of the event.
 */