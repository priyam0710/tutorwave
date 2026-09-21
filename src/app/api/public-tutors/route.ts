
import { NextResponse } from 'next/server';

const CRM_API_URL =
  process.env.TUTORWAVE_CRM_URL ||
  'https://tutorwave-crm-xi.vercel.app';

export async function GET() {
  try {
    const response = await fetch(
      `${CRM_API_URL}/api/public/tutors`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            data?.error ||
            'Unable to fetch tutors from TutorWave CRM.',
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error(
      'Public tutor API error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Unable to connect to TutorWave CRM.',
      },
      {
        status: 502,
      }
    );
  }
}
