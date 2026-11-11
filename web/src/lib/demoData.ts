// Dummy Adawise data for the hackathon demo. Replace with calls to the Adawise backend.

export type GoalType = 'flexible' | 'goal-locked' | 'time-locked'

export type Goal = {
  id: string
  name: string
  type: GoalType
  saved: number
  target: number
  /** ISO date, only for time-locked goals */
  unlockDate?: string
  partner?: { name: string; initials: string; role: 'saver' | 'supporter' }
  nextContribution?: { amount: number; due: string }
}

export type Circle = {
  id: string
  name: string
  members: { name: string; initials: string; progress: number }[]
}

export const GOALS: Goal[] = [
  {
    id: 'laptop',
    name: 'New laptop',
    type: 'goal-locked',
    saved: 3200,
    target: 5000,
    partner: { name: 'Kofi', initials: 'KA', role: 'saver' },
    nextContribution: { amount: 250, due: '2026-11-15' },
  },
  {
    id: 'rent',
    name: 'Rent',
    type: 'time-locked',
    saved: 750,
    target: 3000,
    unlockDate: '2027-03-12',
    partner: { name: 'Esi', initials: 'EB', role: 'supporter' },
    nextContribution: { amount: 300, due: '2026-11-18' },
  },
  {
    id: 'emergency',
    name: 'Emergency',
    type: 'flexible',
    saved: 200,
    target: 500,
    nextContribution: { amount: 50, due: '2026-11-20' },
  },
]

export const CIRCLES: Circle[] = [
  {
    id: 'hostel',
    name: 'Hostel fund',
    members: [
      { name: 'Ama', initials: 'AM', progress: 82 },
      { name: 'You', initials: 'YO', progress: 64 },
      { name: 'Yaw', initials: 'YB', progress: 31 },
      { name: 'Kofi', initials: 'KA', progress: 55 },
      { name: 'Efua', initials: 'EF', progress: 58 },
    ],
  },
  {
    id: 'trip',
    name: 'Family trip',
    members: [
      { name: 'You', initials: 'YO', progress: 24 },
      { name: 'Akos', initials: 'AK', progress: 18 },
      { name: 'Nana', initials: 'NA', progress: 18 },
    ],
  },
]

export const SAVE_ME = { used: 1, allowed: 3 }
export const FIXED_DEPOSITS = 2000
export const INTEREST_EARNED = 75
export const WISE_BADGES = 4
export const PARTNER_REQUESTS = 1

export const GOAL_TYPE_LABEL: Record<GoalType, string> = {
  flexible: 'Flexible',
  'goal-locked': 'Goal-locked',
  'time-locked': 'Time-locked',
}

export function ghs(n: number, decimals = 2) {
  return 'GHS ' + n.toLocaleString('en-GH', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function shortDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export const totals = () => {
  const total = GOALS.reduce((s, g) => s + g.saved, 0)
  const available = GOALS.filter((g) => g.type === 'flexible').reduce((s, g) => s + g.saved, 0)
  return { total, locked: total - available, available }
}

export const circleProgress = (c: Circle) => Math.round(c.members.reduce((s, m) => s + m.progress, 0) / c.members.length)
