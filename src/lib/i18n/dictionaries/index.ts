import type { Locale } from '../config'
import { sq, type Dictionary } from './sq'
import { en } from './en'
import { it } from './it'
import { de } from './de'
import { fr } from './fr'

export type { Dictionary }

export const dictionaries: Record<Locale, Dictionary> = { sq, en, it, de, fr }
