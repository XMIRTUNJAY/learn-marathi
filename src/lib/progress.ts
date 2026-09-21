// Progress tracking — localStorage API for unit completion, streak, weak words
const STORAGE_KEY = 'bol-marathi-progress';
const STREAK_KEY = 'bol-marathi-streak-date';
const STREAK_COUNT_KEY = 'bol-marathi-streak-count';
const WEAK_KEY = 'bol-marathi-weak-words';

export interface UnitProgress {
	completed: boolean;
	completedAt?: number;
}

export interface ProgressData {
	[key: string]: UnitProgress;
}

function getProgress(): ProgressData {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
	} catch {
		return {};
	}
}

function setProgress(data: ProgressData): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch {
		// ignore quota exceeded
	}
}

export function getUnitProgress(unit: string): UnitProgress {
	return getProgress()[unit] ?? { completed: false };
}

export function setUnitComplete(unit: string): void {
	const p = getProgress();
	if (!p[unit]?.completed) {
		p[unit] = { completed: true, completedAt: Date.now() };
		setProgress(p);
		updateStreak();
	}
}

export function getAllProgress(): ProgressData {
	return getProgress();
}

function updateStreak(): void {
	const today = new Date().toDateString();
	const last = localStorage.getItem(STREAK_KEY);
	let count = parseInt(localStorage.getItem(STREAK_COUNT_KEY) || '0', 10);
	if (last !== today) {
		const yesterday = new Date(Date.now() - 864e5).toDateString();
		count = last === yesterday ? count + 1 : 1;
		localStorage.setItem(STREAK_KEY, today);
		localStorage.setItem(STREAK_COUNT_KEY, String(count));
	}
}

export function getStreak(): number {
	return parseInt(localStorage.getItem(STREAK_COUNT_KEY) || '0', 10);
}

export function addWeakWord(wordId: string): void {
	try {
		const w = new Set(JSON.parse(localStorage.getItem(WEAK_KEY) || '[]'));
		w.add(wordId);
		localStorage.setItem(WEAK_KEY, JSON.stringify([...w]));
	} catch { /* ignore */ }
}

export function getWeakWords(): string[] {
	try {
		return JSON.parse(localStorage.getItem(WEAK_KEY) || '[]');
	} catch {
		return [];
	}
}