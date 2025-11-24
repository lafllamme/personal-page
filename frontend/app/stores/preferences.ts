import { defineStore } from 'pinia'

export interface UserPreferences {
  flashlight: boolean
  radius: number
  dim: number
}

// This store is a thin cookie facade. It should not hold UI state.
export const usePreferencesStore = defineStore('preferences', () => {
  const cookie = useCookie<UserPreferences>('userPreferences', {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
    path: '/',
    default: () => ({ flashlight: true, radius: 265, dim: 0.93 }),
  })

  function getPreferences(): UserPreferences {
    // Ensure sensible defaults if cookie is empty
    return cookie.value || { flashlight: true, radius: 265, dim: 0.93 }
  }

  function setPreferences(update: Partial<UserPreferences>) {
    const current = getPreferences()
    cookie.value = { ...current, ...update }
  }

  return {
    getPreferences,
    setPreferences,
  }
})
