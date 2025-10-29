import supabase from '../config/database.js'

class Feedback {
  static async getAll() {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    return data
  }

  static async create(feedbackData) {
    const { data, error } = await supabase
      .from('feedback')
      .insert([
        {
          student_name: feedbackData.studentName,
          course_code: feedbackData.courseCode,
          course_name: feedbackData.courseName,
          comments: feedbackData.comments,
          rating: feedbackData.rating
        }
      ])
      .select()
    
    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    return data[0]
  }

  static async delete(id) {
    const { error } = await supabase
      .from('feedback')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    return { affectedRows: 1 }
  }
}

export default Feedback
