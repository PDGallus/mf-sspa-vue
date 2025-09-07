import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  styles: [
    `
      :host {
        display: block;
        margin-left: var(--navbar-width, 0);
        padding: 16px;
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .card {
        margin-top: 1.6rem;
        padding: 3.2rem;
        background: #fff;
        border-radius: 8px;
        max-width: 75%;
      }
      .card img {
        max-width: 100%;
      }
      .actions {
        margin-top: 1.6rem;
        display: flex;
        justify-content: center;
      }
      h1 {
        margin: 0;
        font-size: 1.8rem;
      }
    `,
  ],
  template: `
    <div>
      <h1>Rate doggos</h1>
      <div class="content">
        <div class="card">
          <div *ngIf="currentDogUrl() as url">
            <img
              [src]="url"
              alt="dog photo"
            />
          </div>
          <div class="actions">
            <select
              [value]="rating()"
              (change)="onNewRating($event)"
            >
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="14.5">14.5</option>
              <option value="15">15</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  currentDogUrl = signal<string | null>(null);
  rating = signal<string>('10');

  constructor() {
    void this.newDog();
    effect(() => {
      // Example effect hook; could be used for debugging
      // console.log('Current rating', this.rating());
    });
  }

  async newDog(): Promise<void> {
    try {
      const r = await fetch('https://dog.ceo/api/breeds/image/random');
      const json = (await r.json()) as { message: string };
      this.currentDogUrl.set(json.message);
      this.rating.set('10');
    } catch (err) {
      console.error('Error loading dog image:', err);
    }
  }

  onNewRating(evt: Event): void {
    const target = evt.target as HTMLSelectElement;
    this.rating.set(target.value);

    const raw = localStorage.getItem('dogs');
    const dogs: { url: string | null; rating: number }[] = raw
      ? (JSON.parse(raw) as { url: string | null; rating: number }[])
      : [];
    dogs.push({ url: this.currentDogUrl(), rating: Number(this.rating()) });
    localStorage.setItem('dogs', JSON.stringify(dogs));

    void this.newDog();
  }
}
