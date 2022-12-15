export interface QuestionsGuard {
  id: number,
  title: string,
  type: string,
  options: {
    id: number,
    text: string,
    optionResponse: boolean
  }[],
  required: {
    condition: boolean,
    meet: boolean
  },
  textResponse: string
}
