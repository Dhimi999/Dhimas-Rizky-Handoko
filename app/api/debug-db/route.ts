import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET() {
  try {
    // Test the connection
    const testConnection = await sql`SELECT current_database(), current_schema();`

    // List all tables in the current schema
    const tables = await sql`
      SELECT table_name, table_schema
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `

    return NextResponse.json({
      connection: testConnection.rows[0],
      tables: tables.rows,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        detail: error.detail,
      },
      { status: 500 },
    )
  }
}

