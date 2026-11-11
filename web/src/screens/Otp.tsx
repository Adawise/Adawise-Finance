import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Footer, PillButton, TopBar } from '../components/ui'
import { maskMsisdn, session } from '../lib/session'
import { NAVY, useThemeColor } from '../lib/useThemeColor'

const LENGTH = 4

export function Otp() {
  useThemeColor(NAVY)
  const navigate = useNavigate()
  const demoCode = (useLocation().state as { code?: string } | null)?.code
  const [code, setCode] = useState('')
  const [showSms, setShowSms] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const masked = maskMsisdn(session.msisdn())

  // Demo stand-in for the SMS arriving; tap it to fill the code
  useEffect(() => {
    if (!demoCode) return
    const show = setTimeout(() => setShowSms(true), 600)
    const hide = setTimeout(() => setShowSms(false), 9000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [demoCode])

  useEffect(() => inputRef.current?.focus(), [])

  const submit = () => {
    if (code.length !== LENGTH) return
    // Demo: any 4-digit code is accepted. Swap for a call to the Adawise backend.
    session.signIn()
    navigate('/home', { replace: true })
  }

  return (
    <div className="relative flex h-full flex-col bg-white">
      <TopBar title="OTP" onBack={() => navigate(-1)} onClose={() => navigate('/welcome', { replace: true })} />

      <AnimatePresence>
        {showSms && demoCode && (
          <motion.button
            type="button"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onClick={() => {
              setCode(demoCode)
              setShowSms(false)
            }}
            className="absolute inset-x-[30px] top-[calc(env(safe-area-inset-top)+14px)] z-10 flex items-center gap-3 rounded-full bg-[#3a3a3c] py-[10px] pl-[10px] pr-5 text-left text-white shadow-lg"
          >
            <span className="grid size-[38px] shrink-0 place-items-center rounded-full bg-[#2f80ed]">
              <svg viewBox="0 0 24 24" className="size-5" fill="white">
                <path d="M12 3C6.5 3 2 6.6 2 11c0 2.4 1.3 4.5 3.4 6L5 21l4-2.2c1 .3 2 .4 3 .4 5.5 0 10-3.6 10-8s-4.5-8-10-8Z" />
              </svg>
            </span>
            <span className="min-w-0 truncate text-[15px]">
              <span className="font-semibold">MobileMoney</span> Enter Code: <span className="underline">{demoCode}</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex min-h-0 flex-1 flex-col items-center px-8 pt-[34px] text-center">
        <h2 className="text-[22px] font-semibold text-navy">OTP sent to {masked}</h2>

        {/* One real input under four visual boxes: keeps paste + SMS autofill working */}
        <label className="relative mt-[48px] flex gap-[12px]">
          {Array.from({ length: LENGTH }, (_, i) => (
            <span
              key={i}
              className="grid size-[48px] place-items-center rounded-[12px] border-[1.5px] border-ink text-[26px] font-semibold text-ink"
            >
              {code[i] ?? ''}
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label="One-time code"
            maxLength={LENGTH}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, LENGTH))}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className="absolute inset-0 bg-transparent text-transparent caret-transparent opacity-0 outline-none"
          />
        </label>
      </div>

      <Footer>
        <PillButton disabled={code.length !== LENGTH} onClick={submit}>
          Next
        </PillButton>
      </Footer>
    </div>
  )
}
