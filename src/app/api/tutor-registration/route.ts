import { NextRequest, NextResponse } from 'next/server';

const CRM_API_URL =
  process.env.TUTORWAVE_CRM_API_URL ||
  'https://tutorwave-crm-xi.vercel.app';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid registration data.',
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${CRM_API_URL}/api/public/tutors/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      }
    );

    const text = await response.text();

    let data: unknown;

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = {
        error: 'The CRM returned an invalid response.',
      };
    }

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error(
      'Tutor registration CRM connection error:',
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          'We could not submit your registration right now. Please try again in a few minutes.',
      },
      { status: 503 }
    );
  }
}
