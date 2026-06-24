import { api } from './api'

export interface OnboardingPayload {
  userId: number
  budgetMin: number
  budgetMax: number
  currency: string
  preferredStyle: string
  accessibilityNeeds: string
  interests: string[]
  climate: string
  whatAreYouLookingFor: string
  adventureLevel: number
  pastTrips: string
}

export const createTravelProfile = async (data: OnboardingPayload) => {
  const payload = {
    userId: data.userId,
    budgetMin: data.budgetMin,
    budgetMax: data.budgetMax,
    currency: data.currency,
    preferredStyle: data.preferredStyle,
    accessibilityNeeds: data.accessibilityNeeds,
    interests: data.interests,
    climate: data.climate,
    whatAreYouLookingFor: data.whatAreYouLookingFor,
    adventureLevel: data.adventureLevel,
    pastTrips: data.pastTrips,
  }
  return api.post('/travel-profile', payload)
}

export const getTravelProfile = async (userId: number) => {
  return api.get(`/travel-profile?userId=${userId}`)
}
