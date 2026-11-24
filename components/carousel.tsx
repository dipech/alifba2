'use client';

import { useLocale } from './locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

export function Carousel({ title, children }: { title: string; children: ReactNode }) {
  const { t } = useLocale();
  const titleId = useId();
  const itemsId = useId();
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    function update() {
      if (!element) return;
      setEdges({
        start: element.scrollLeft < 2,
        end: element.scrollWidth - element.clientWidth - element.scrollLeft < 2,
      });
    }
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      element.removeEventListener('scroll', update);
    };
  }, []);

  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    const first = element.children[0] as HTMLElement | undefined;
    const second = element.children[1] as HTMLElement | undefined;
    if (!first || !second) return;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    element.scrollBy({ left: (second.offsetLeft - first.offsetLeft) * direction, behavior });
  }

  return <section className="shelf" aria-labelledby={titleId}>
    <div className="section-head">
      <h2 id={titleId}>{title}</h2>
      <div className="section-actions">
        <div className="carousel-controls">
          <button type="button" aria-label={`${title}: ${t('назад')}`} aria-controls={itemsId} disabled={edges.start} onClick={() => move(-1)}><ChevronLeft size={20} /></button>
          <button type="button" aria-label={`${title}: ${t('вперёд')}`} aria-controls={itemsId} disabled={edges.end} onClick={() => move(1)}><ChevronRight size={20} /></button>
        </div>
      </div>
    </div>
    <div className="carousel" id={itemsId} ref={rail} tabIndex={0} aria-label={`${t('Карточки')} «${title}»`}
      onKeyDown={event => {
        if (event.target !== event.currentTarget || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        move(event.key === 'ArrowLeft' ? -1 : 1);
      }}>
      {children}
    </div>
  </section>;
}
