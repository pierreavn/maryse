import { Injectable } from "@angular/core";
import { Preferences } from "./preferences.interfaces";

@Injectable({ providedIn: 'root' })
export class PreferencesService {
  /**
   * Default Preferences on start
   */
  protected readonly defaultPreferences: Preferences = {
    lang: 'en',
    repos: [],
  };

  protected readonly localStorageKey = 'maryse-preferences';

  /**
   * Get user preferences
   */
  public getPreferences(): Preferences {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : {...this.defaultPreferences};
  }

  /**
   * Save user preferences
   * @param preferences
   */
  public savePreferences(preferences: Partial<Preferences>): void {
    const previousPreferences = this.getPreferences();
    localStorage.setItem(this.localStorageKey, JSON.stringify({
      ...previousPreferences,
      ...preferences,
    }));
  }
}
