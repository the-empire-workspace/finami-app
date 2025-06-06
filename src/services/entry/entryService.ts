import {useEntryQueries} from 'utils/database/queries'
import {Entry, EntryCreateParams, EntryUpdateParams} from 'utils/database/models'

export const useEntryService = () => {
  const {
    createEntry,
    updateEntry,
    getEntries,
    getEntry,
    deleteEntry,
    getAccountEntries
  } = useEntryQueries()

  const createNewEntry = async (params: EntryCreateParams): Promise<Entry | null> => {
    try {
      return await createEntry(params)
    } catch (error) {
      console.error('Error creating entry:', error)
      return null
    }
  }

  const updateExistingEntry = async (params: EntryUpdateParams): Promise<Entry | null> => {
    try {
      return await updateEntry(params)
    } catch (error) {
      console.error('Error updating entry:', error)
      return null
    }
  }

  const fetchEntries = async (filters?: {
    account_id?: number;
    category_id?: number;
    entry_type?: string;
    payment_type?: string;
    status?: string;
    start_date?: Date;
    end_date?: Date;
  }): Promise<Entry[]> => {
    try {
      return await getEntries(filters)
    } catch (error) {
      console.error('Error fetching entries:', error)
      return []
    }
  }

  const fetchEntry = async (id: number): Promise<Entry | null> => {
    try {
      return await getEntry(id)
    } catch (error) {
      console.error('Error fetching entry:', error)
      return null
    }
  }

  const removeEntry = async (id: number): Promise<boolean> => {
    try {
      return await deleteEntry(id)
    } catch (error) {
      console.error('Error deleting entry:', error)
      return false
    }
  }

  const fetchAccountEntries = async (accountId: number): Promise<Entry[]> => {
    try {
      return await getAccountEntries(accountId)
    } catch (error) {
      console.error('Error fetching account entries:', error)
      return []
    }
  }

  return {
    createNewEntry,
    updateExistingEntry,
    fetchEntries,
    fetchEntry,
    removeEntry,
    fetchAccountEntries
  }
} 