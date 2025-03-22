import { create } from 'zustand'

interface TestCodeState {
  testCode: string
  setTestCode: (code: string) => void
  resetTestCode: () => void
}

const useTestCode = create<TestCodeState>((set) => ({
  testCode: '',
  setTestCode: (code) => set({ testCode: code }),
  resetTestCode: () => set({ testCode: '' })
}))

export default useTestCode
