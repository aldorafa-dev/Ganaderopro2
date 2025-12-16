# Design Guidelines: Sistema de Gestión Ganadera PWA

## Design Approach: Hybrid System

**Selected Framework**: Material Design principles adapted for agricultural field use
**Rationale**: Data-heavy productivity application requiring robust component patterns, high readability in outdoor conditions, and efficient information architecture for complex livestock management workflows.

## Typography System

**Font Family**: 
- Primary: Inter (via Google Fonts) - exceptional legibility at all sizes
- Weights: 400 (Regular), 600 (Semibold), 700 (Bold)

**Type Scale**:
- Display headings: text-4xl (36px), font-bold
- Section headings: text-2xl (24px), font-semibold  
- Subsection headings: text-xl (20px), font-semibold
- Body text: text-base (16px), font-normal
- Field labels: text-sm (14px), font-semibold
- Secondary info: text-sm (14px), font-normal
- Button text: text-base (16px), font-semibold

**Critical for field use**: Minimum 16px body text, 14px for labels - never smaller

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing (between related elements): p-2, gap-2
- Standard spacing (component internal): p-4, gap-4
- Section spacing: p-6, p-8
- Major spacing (between sections): mb-12, mb-16

**Grid Structure**:
- Mobile: Single column, full-width cards
- Tablet (md): 2-column layouts for statistics, animal cards
- Desktop (lg): 3-column maximum for dashboards, 2-column for forms

**Container Strategy**:
- Main content: max-w-7xl mx-auto px-4
- Forms/detailed views: max-w-3xl mx-auto
- Full-width maps and tables: w-full

## Component Library

### Navigation
**Bottom Tab Bar (Mobile Primary)**:
- Fixed bottom navigation with 5 main tabs: Inicio, Animales, Reproducción, Mapa, Alertas
- Large touch targets: h-16 minimum
- Icons + labels always visible
- Active state clearly distinguished

**Top App Bar**:
- Establishment selector dropdown
- Quick filters
- Search functionality
- Action buttons (Add, Backup)

### Cards & Data Display
**Animal Cards**:
- Large cards with clear hierarchy
- Caravana (ID) prominently displayed (text-xl, bold)
- Category, sex, age in organized rows
- Quick action buttons: Ver Detalles, Editar, Mover
- Status indicators (pregnant, alert) as badges

**Statistics Cards**:
- Number-focused design
- Large metric value (text-3xl, bold)
- Label below (text-sm)
- Trend indicators where applicable
- Grid layout: 2 columns mobile, 3-4 columns desktop

**List Items**:
- Generous padding (p-4 minimum)
- Clear separation (border-b or gap-2)
- Left-aligned content with right-aligned actions
- Swipe actions on mobile (Editar, Eliminar)

### Forms
**Input Fields**:
- Extra large touch targets: h-14 minimum
- Labels above inputs always (text-sm, font-semibold, mb-2)
- Clear placeholder text
- Validation feedback immediately visible below field
- RFID icon/button adjacent to caravana input

**Buttons**:
- Primary actions: h-12 minimum, rounded-lg, font-semibold
- Secondary actions: h-10, outlined style
- Danger actions: clearly distinguished
- Icon + text for clarity
- Full-width on mobile for primary CTAs

**Date Pickers**:
- Large calendar interface
- Quick shortcuts (Hoy, Esta Semana, Este Mes)
- Touch-optimized controls

### Tables (Desktop)
**Responsive Table Strategy**:
- Desktop: Full table with sortable columns
- Mobile: Card-based layout with key fields visible
- Horizontal scroll for complex data sets
- Sticky headers
- Row actions always accessible

### Maps
**Field Map Component**:
- Full-screen capable
- Polygon overlays for lotes
- Color-coded by rodeo/category
- Legend panel (collapsible)
- Animal markers with clustering
- Touch gestures: pinch-zoom, pan
- Offline map data cached

### Alerts & Notifications
**Alert Cards**:
- Priority-based ordering (urgent, upcoming, routine)
- Icon indicating alert type
- Clear date/time information
- One-tap action to view details
- Dismissible with archive option
- Filter chips at top (Establecimiento, Lote, Tipo)

### Statistical Dashboards
**Chart Components**:
- Bar charts for comparisons (IATF vs Natural)
- Line charts for trends
- Pie charts for distribution
- Large labels and legends
- Interactive tooltips (tap on mobile)
- Export to CSV button prominent

**Reproduction Overview**:
- Timeline visualization for breeding events
- Gestation calculator visible
- Quick stats: % preñez, días promedio gestación
- Ranking tables for toros

### Empty States
- Large icons (w-24 h-24)
- Helpful message (text-lg)
- Primary CTA to add first item
- Educational hints for complex features

## Accessibility & Field Optimization

**High Contrast Mode**:
- Strong borders on all interactive elements
- Clear focus indicators (4px border)
- No reliance on subtle color differences

**Touch Targets**:
- Minimum 44x44px for all interactive elements
- Spacing between adjacent targets: gap-4 minimum
- Avoid clustered small buttons

**Readability**:
- Line-height: 1.6 for body text
- Generous letter-spacing for headings
- Avoid text over complex backgrounds
- Strong text contrast ratios (WCAG AAA preferred)

## Responsive Breakpoints
- Mobile: base (< 768px) - primary design target
- Tablet: md (768px - 1024px) - optimized layouts
- Desktop: lg (1024px+) - enhanced multi-column views

## Animation Guidelines
**Minimal Animations Only**:
- Page transitions: Simple fade (200ms)
- Loading states: Spinner or skeleton screens
- Success confirmations: Brief checkmark animation
- NO decorative animations - preserve battery for field use

## Images
**Hero Image**: None - this is a productivity tool, not marketing
**Functional Images**:
- Placeholder animal photos in profiles (optional user upload)
- Map satellite imagery (cached for offline)
- Icon illustrations for empty states
All images must be optimized for mobile bandwidth and offline caching.