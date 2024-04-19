import prisma from '@/prisma/PrismaClient'
import { Sag } from '@prisma/client'
import axios from 'axios'

export async function GET() {
  try {
    const result = await axios.get<{ value: any[] }>(
      'https://oda.ft.dk/api/Sag?$filter=((typeid%20eq%203)%20or%20(typeid%20eq%205)%20or%20(typeid%20eq%209))%20and%20(periodeid%20eq%20160)'
    )
    const casesToCreate: Sag[] = result.data.value!.map((item) => {
      const { id, kategoriid, typeid, titel, nummer, periodeid, statusid } = item
      return {
        id: id,
        category_id: kategoriid,
        type_id: typeid,
        title: titel,
        number: nummer,
        period_id: periodeid,
        status_id: statusid
      }
    })
    if (result.status === 200) {
      //Map out the cases with the keys wanted

      //Insert the cases in the db
      prisma.sag.createMany({ data: casesToCreate }).catch(() => Response.json(casesToCreate))

      return Response.json(casesToCreate)
    } else {
      //If we cannot get data from the API, we use whatever data we have stored.
      prisma.sag
        .findMany()
        .then((res) => {
          return Response.json(res)
        })
        .catch((err) => Response.json(err, { status: 500 }))
    }
    return Response.json(casesToCreate)
  } catch (err) {
    //If we cannot get data from the API, we use whatever data we have stored.
    prisma.sag
      .findMany()
      .then((res) => {
        return Response.json(res)
      })
      .catch((err) => {
        console.error(err)
        return Response.json(err, { status: 500 })
      })

    console.error(err)
    return Response.json({ message: 'SERVER_ERROR' }, { status: 500 })
  }
}
