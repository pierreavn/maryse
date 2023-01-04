import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DurationsService {
  /**
   * Parse given duration to seconds
   *   "7s"        => 7
   *   "30m"       => 1800
   *   "2d 1h 15m 1s" => 177301
   * @param duration
   */
  public parseToSeconds(duration: string): number {
    let totalSeconds = 0;
    const days = duration.match(/(\d+)\s*d/);
    const hours = duration.match(/(\d+)\s*h/);
    const minutes = duration.match(/(\d+)\s*m/);
    const seconds = duration.match(/(\d+)\s*s/);

    if (days) { totalSeconds += parseInt(days[1])*86400; }
    if (hours) { totalSeconds += parseInt(hours[1])*3600; }
    if (minutes) { totalSeconds += parseInt(minutes[1])*60; }
    if (seconds) { totalSeconds += parseInt(seconds[1]); }

    return totalSeconds;
  }
}
