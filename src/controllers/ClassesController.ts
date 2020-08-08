import { Request, Response } from 'express'
import db from '../database/connection'
import convertHoursToMinutes from '../utils/convertHoursToMinutes'

interface ScheduleType {
  week_day: number;
  from: string
  to: string
}

export default class ClassesController {
  async create (req: Request, res: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body

    const trx = await db.transaction()

    try {
      const insertedUsersIds = await trx('users').insert({
        name: name,
        avatar,
        whatsapp,
        bio
      })

      const userId = insertedUsersIds[0]

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id: userId
      })

      const classId = insertedClassesIds[0]

      const classSchedule = schedule.map((scheduleItem: ScheduleType) => {
        return {
          class_id: classId,
          week_day: scheduleItem.week_day,
          from: convertHoursToMinutes(scheduleItem.from),
          to: convertHoursToMinutes(scheduleItem.to)
        }
      })

      await trx('class_schedule').insert(classSchedule)

      await trx.commit()

      return res.status(201).json({ ok: true })
    } catch (err) {
      await trx.rollback()

      return res.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }
}
