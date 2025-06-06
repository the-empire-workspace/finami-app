import {useCategoryQueries} from 'utils/database/queries'
import {Category, CategoryCreateParams, CategoryUpdateParams} from 'utils/database/models'

export const useCategoryService = () => {
  const {
    createCategory,
    updateCategory,
    getCategories,
    getCategory,
    deleteCategory
  } = useCategoryQueries()

  const createNewCategory = async (params: CategoryCreateParams): Promise<Category | null> => {
    try {
      return await createCategory(params)
    } catch (error) {
      console.error('Error creating category:', error)
      return null
    }
  }

  const updateExistingCategory = async (params: CategoryUpdateParams): Promise<Category | null> => {
    try {
      return await updateCategory(params)
    } catch (error) {
      console.error('Error updating category:', error)
      return null
    }
  }

  const fetchCategories = async (type?: string): Promise<Category[]> => {
    try {
      return await getCategories(type)
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  const fetchCategory = async (id: number): Promise<Category | null> => {
    try {
      return await getCategory(id)
    } catch (error) {
      console.error('Error fetching category:', error)
      return null
    }
  }

  const removeCategory = async (id: number): Promise<boolean> => {
    try {
      return await deleteCategory(id)
    } catch (error) {
      console.error('Error deleting category:', error)
      return false
    }
  }

  return {
    createNewCategory,
    updateExistingCategory,
    fetchCategories,
    fetchCategory,
    removeCategory
  }
} 