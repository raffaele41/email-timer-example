import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
export const runtime = 'edge'
export async function GET(req: NextRequest) {
  try {
    const launch = new Date('2026-03-31T22:00:00Z')
    const now = new Date()
    let diff = Math.floor((launch.getTime() - now.getTime()) / 1000)
    if (diff < 0) diff = 0
    const days = String(Math.floor(diff / 86400)).padStart(2, '0')
    const hours = String(Math.floor((diff % 86400) / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0')
    const seconds = String(diff % 60).padStart(2, '0')
    const id = req.nextUrl.searchParams.get('id') || 'unknown'
    const job = req.nextUrl.searchParams.get('job') || 'unknown'
    console.log(JSON.stringify({ timestamp: now.toISOString(), id, job, days, hours, minutes, seconds }))
    return new ImageResponse(
      (
        <div style={{
          width: '800px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#240709',
        }}>
          {[{ value: days, label: 'days' }, { value: hours, label: 'hours' }, { value: minutes, label: 'min' }, { value: seconds, label: 'sec' }].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '180px' }}>
                <span style={{ color: 'white', fontSize: '80px', fontWeight: 'bold', fontFamily: 'sans-serif', lineHeight: 1 }}>
                  {item.value}
                </span>
                <span style={{ color: 'white', fontSize: '18px', fontFamily: 'sans-serif', marginTop: '8px' }}>
                  {item.label}
                </span>
              </div>
              {i < 3 && <div style={{ width: '2px', height: '100px', background: 'white' }} />}
            </div>
          ))}
        </div>
      ),
      { width: 800, height: 200 }
    )
  } catch (error) {
    return new ImageResponse(
      (
        <div style={{
          width: '800px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#240709',
        }}>
          <span style={{ color: 'white', fontSize: '30px', fontFamily: 'sans-serif' }}>
            glo — Coming Soon
          </span>
        </div>
      ),
      { width: 800, height: 200 }
    )
  }
}
