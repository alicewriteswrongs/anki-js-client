interface Field {
  value: string
  order: number
}

interface Note {
  fields: Record<string, Field>
  cards: number[]
  interval: number[]
  interval_avg: number
  noteId: number
  tags: string[]
}

export interface IKanji extends Note {
  kanji: string
  level: number
}

export interface IVocab extends Note {
  vocab: string
  level: number
}
