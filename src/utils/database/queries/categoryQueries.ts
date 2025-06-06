import {debugLog} from 'utils'
import {selectQuery, executeQuery} from '../config/databaseHelpers'
import {Category, CategoryCreateParams, CategoryUpdateParams} from '../models/Category'

export const useCategoryQueries = () => {
  const createCategory = async (params: CategoryCreateParams): Promise<Category | null> => {
    try {
      const newCategory: any = await executeQuery(
        'INSERT INTO categories (name, comment, type, date) VALUES (?, ?, ?, ?)',
        [params.name, params.comment, params.type, params.date],
      )
      if (!newCategory) {
        return null
      }
      const category: any = await selectQuery(
        'SELECT * FROM categories where id = ?',
        [newCategory.insertId],
      )
      return category.raw()[0]
    } catch (error) {
      debugLog('error category creation', error)
      return null
    }
  }

  const updateCategory = async (params: CategoryUpdateParams): Promise<Category | null> => {
    try {
      await executeQuery(
        'UPDATE categories SET name = ?, comment = ?, type = ?, date = ? WHERE id = ?',
        [params.name, params.comment, params.type, params.date, params.id],
      )
      const category: any = await selectQuery(
        'SELECT * FROM categories where id = ?',
        [params.id],
      )
      return category.raw()[0]
    } catch (error) {
      debugLog('error category update', error)
      return null
    }
  }

  const getCategories = async (type?: string): Promise<Category[]> => {
    try {
      const categories: any = await selectQuery(
        type
          ? 'SELECT * FROM categories WHERE type = ?'
          : 'SELECT * FROM categories',
        type ? [type] : [],
      )
      return categories.raw()
    } catch (error) {
      debugLog('error getting categories', error)
      return []
    }
  }

  const getCategory = async (id: number): Promise<Category | null> => {
    try {
      const category: any = await selectQuery(
        'SELECT * FROM categories where id = ?',
        [id],
      )
      return category.raw()[0]
    } catch (error) {
      debugLog('error getting category', error)
      return null
    }
  }

  const deleteCategory = async (id: number): Promise<boolean> => {
    try {
      await executeQuery('DELETE FROM categories WHERE id = ?', [id])
      return true
    } catch (error) {
      debugLog('error deleting category', error)
      return false
    }
  }

  return {
    createCategory,
    updateCategory,
    getCategories,
    getCategory,
    deleteCategory,
  }
} 