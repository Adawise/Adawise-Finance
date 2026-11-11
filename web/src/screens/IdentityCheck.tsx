import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner, TopBar } from '../components/ui'
import { generateDemoCode, maskMsisdn, session } from '../lib/session'
import { NAVY, useThemeColor } from '../lib/useThemeColor'

const AUTO_VERIFY_MS = 3500

export function IdentityCheck() {
  useThemeColor(NAVY)
  const navigate = useNavigate()
  const [attempt, setAttempt] = useState(0)
  const masked = maskMsisdn(session.msisdn())

  // Demo: "auto-verification" times out and falls through to manual OTP entry,
  // carrying a fake code that the OTP screen shows as an incoming SMS.
  useEffect(() => {
    const t = setTimeout(() => {
      navigate('/otp', { state: { code: generateDemoCode() } })
    }, AUTO_VERIFY_MS)
    return () => clearTimeout(t)
  }, [attempt, navigate])

  return (
    <div className="flex h-full flex-col bg-white">
      <TopBar title="Identity Check" onBack={() => navigate(-1)} onClose={() => navigate('/welcome', { replace: true })} />

      <div className="flex flex-col items-center px-8 pt-[34px] text-center">
        <h2 className="text-[22px] font-semibold leading-[1.35] text-navy">
          Code sent to {masked} for auto-verification
        </h2>

        <div className="mt-[54px]">
          <Spinner />
        </div>

        <p className="mt-[50px] text-[15px] text-muted">
          Did not receive an OTP?{' '}
          <button type="button" className="font-semibold text-navy active:opacity-60" onClick={() => setAttempt((a) => a + 1)}>
            Resend
          </button>
        </p>

        <p className="mt-[76px] text-[19px] text-muted">Please wait while we verify you</p>
      </div>
    </div>
  )
}
