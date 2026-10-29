"use client";

import React, { useMemo, useState } from "react";

type Role = "admin" | "instructor" | "student";
type IconName =
  | "home"
  | "users"
  | "calendar"
  | "file"
  | "car"
  | "chart"
  | "bell"
  | "search"
  | "plus"
  | "clock"
  | "check"
  | "arrow"
  | "menu"
  | "close"
  | "chevron"
  | "book"
  | "card"
  | "wrench"
  | "shield"
  | "gauge"
  | "filter"
  | "map"
  | "inbox"
  | "upload"
  | "download";

const iconPaths: Record<IconName, React.ReactNode> = {
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></>,
  car: <><path d="M5 17H3v-6l2-5h14l2 5v6h-2"/><path d="M5 17h14M7 17v2M17 17v2M3 11h18"/><circle cx="7" cy="14" r="1"/><circle cx="17" cy="14" r="1"/></>,
  chart: <><path d="M4 19V9M10 19V5M16 19v-8M22 19V2"/><path d="M2 19h22"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M4 6.5v13"/></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/></>,
  wrench: <><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L4 17a2 2 0 1 0 3 3l8.3-8.3a4 4 0 0 0 5-5L18 9l-2.4-2.4L18 4.3z"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></>,
  gauge: <><path d="M4 19a8 8 0 1 1 16 0"/><path d="m12 15 3-4M7 18h10"/></>,
  filter: <path d="M4 5h16l-6 7v5l-4 2v-7z"/>,
  map: <><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/></>,
  inbox: <><path d="M4 4h16v13H4z"/><path d="M4 13h4l2 3h4l2-3h4M8 8h8"/></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 20h14"/></>,
  download: <><path d="M12 4v12M7 11l5 5 5-5"/><path d="M5 20h14"/></>,
};

function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

const nav = [
  { label: "Apžvalga", icon: "home" as IconName },
  { label: "Mokiniai", icon: "users" as IconName },
  { label: "Kalendorius", icon: "calendar" as IconName },
  { label: "Sutartys", icon: "file" as IconName },
  { label: "Transportas", icon: "car" as IconName },
  { label: "Vairavimo žurnalas", icon: "book" as IconName },
  { label: "Dokumentų srautas", icon: "inbox" as IconName },
  { label: "Ataskaitos", icon: "chart" as IconName },
  { label: "Vieša registracija", icon: "book" as IconName },
];

const roleLabels: Record<Role, string> = {
  admin: "Administratorius",
  instructor: "Instruktorius",
  student: "Mokinys",
};

const branchOptions = [
  { value: "Visi skyriai", label: "Visi skyriai", meta: "Bendra mokyklos suvestinė", students: 248, lessons: 18, contracts: 3, revenue: "34 820 €" },
  { value: "Centro skyrius", label: "Centro skyrius", meta: "Centro skyrius", students: 86, lessons: 7, contracts: 1, revenue: "12 640 €" },
  { value: "Šiaurės skyrius", label: "Šiaurės skyrius", meta: "Šiaurės skyrius", students: 74, lessons: 5, contracts: 1, revenue: "10 980 €" },
  { value: "Pietų skyrius", label: "Pietų skyrius", meta: "Pietų skyrius", students: 51, lessons: 4, contracts: 1, revenue: "7 360 €" },
  { value: "Vakarų skyrius", label: "Vakarų skyrius", meta: "Vakarų skyrius", students: 37, lessons: 2, contracts: 0, revenue: "3 840 €" },
];

const lessons = [
  { time: "09:00", end: "10:30", name: "Lukas Petrauskas", type: "B kategorija", place: "Centro skyrius", tone: "red" },
  { time: "11:00", end: "12:30", name: "Gabija Jankauskaitė", type: "B kategorija · automatas", place: "Šiaurės skyrius", tone: "blue" },
  { time: "14:00", end: "15:30", name: "Mantas Žukauskas", type: "Papildomas važiavimas", place: "Centro skyrius", tone: "amber" },
];

const students = [
  { id: 1, initials: "LP", name: "Lukas Petrauskas", course: "B kategorija", category: "B", gearbox: "Mechaninė", progress: 75, theory: 92, hours: "22,5 / 30 val.", driven: 22.5, total: 30, status: "Aktyvus", statusKey: "active", color: "#e9414a", email: "lukas.petrauskas@email.lt", phone: "+370 612 34 567", instructor: "Darius Siudikas", branch: "Centro skyrius", start: "2026-06-03", contract: "SUT-2026-1842", price: 400, paid: 300, nextLesson: "Liepos 21 d., 09:00", exam: "Dar neregistruotas" },
  { id: 2, initials: "GJ", name: "Gabija Jankauskaitė", course: "B · automatas", category: "B", gearbox: "Automatinė", progress: 47, theory: 68, hours: "14 / 30 val.", driven: 14, total: 30, status: "Aktyvus", statusKey: "active", color: "#6575d8", email: "gabija.j@email.lt", phone: "+370 623 45 789", instructor: "Vesta Jankauskienė", branch: "Šiaurės skyrius", start: "2026-06-18", contract: "SUT-2026-1907", price: 450, paid: 250, nextLesson: "Liepos 22 d., 11:00", exam: "Dar neregistruotas" },
  { id: 3, initials: "MŽ", name: "Mantas Žukauskas", course: "B kategorija", category: "B", gearbox: "Mechaninė", progress: 100, theory: 100, hours: "30 / 30 val.", driven: 30, total: 30, status: "Baigia", statusKey: "finishing", color: "#269b77", email: "mantas.z@email.lt", phone: "+370 655 78 901", instructor: "Darius Siudikas", branch: "Centro skyrius", start: "2026-04-27", contract: "SUT-2026-1611", price: 400, paid: 400, nextLesson: "Mokymai baigti", exam: "2026-07-29, 08:30" },
  { id: 4, initials: "EK", name: "Emilija Kazlauskaitė", course: "A2 kategorija", category: "A2", gearbox: "Mechaninė", progress: 20, theory: 34, hours: "4 / 20 val.", driven: 4, total: 20, status: "Naujas", statusKey: "new", color: "#d6933b", email: "emilija.k@email.lt", phone: "+370 601 22 334", instructor: "Tomas Noreika", branch: "Pietų skyrius", start: "2026-07-14", contract: "SUT-2026-2044", price: 400, paid: 200, nextLesson: "Liepos 23 d., 14:00", exam: "Dar neregistruotas" },
  { id: 5, initials: "AV", name: "Austėja Vaitkutė", course: "B · automatas", category: "B", gearbox: "Automatinė", progress: 60, theory: 84, hours: "18 / 30 val.", driven: 18, total: 30, status: "Trūksta dokumentų", statusKey: "attention", color: "#b16a9d", email: "austeja.v@email.lt", phone: "+370 687 91 245", instructor: "Vesta Jankauskienė", branch: "Šiaurės skyrius", start: "2026-05-29", contract: "SUT-2026-1779", price: 450, paid: 450, nextLesson: "Liepos 24 d., 16:00", exam: "Dar neregistruotas" },
  { id: 6, initials: "TN", name: "Tadas Norkus", course: "C kategorija", category: "C", gearbox: "Mechaninė", progress: 35, theory: 55, hours: "7 / 20 val.", driven: 7, total: 20, status: "Aktyvus", statusKey: "active", color: "#4c83b6", email: "tadas.n@email.lt", phone: "+370 698 42 114", instructor: "Tomas Noreika", branch: "Vakarų skyrius", start: "2026-06-26", contract: "SUT-2026-1963", price: 400, paid: 200, nextLesson: "Liepos 22 d., 08:00", exam: "Dar neregistruotas" },
];

const vehicles = [
  { id: 1, make: "Toyota Corolla", plate: "JTD 248", year: 2024, gearbox: "Automatinė", category: "B", instructor: "Darius Siudikas", branch: "Centro skyrius", mileage: "42 180 km", status: "Eksploatuojama", statusKey: "active", service: "Po 2 820 km", technical: "2027-02-14", insurance: "2026-11-30", color: "#e73f49", bookings: 18 },
  { id: 2, make: "Volkswagen Golf", plate: "MOK 517", year: 2023, gearbox: "Mechaninė", category: "B", instructor: "Vesta Jankauskienė", branch: "Šiaurės skyrius", mileage: "58 940 km", status: "Eksploatuojama", statusKey: "active", service: "Po 7 060 km", technical: "2026-12-08", insurance: "2027-01-16", color: "#6575d8", bookings: 14 },
  { id: 3, make: "Škoda Octavia", plate: "DEM 032", year: 2022, gearbox: "Mechaninė", category: "B", instructor: "Mantas Balsys", branch: "Pietų skyrius", mileage: "79 520 km", status: "Reikia priežiūros", statusKey: "attention", service: "Po 480 km", technical: "2026-08-04", insurance: "2026-10-22", color: "#d28a2f", bookings: 9 },
  { id: 4, make: "Toyota Yaris", plate: "KET 909", year: 2024, gearbox: "Automatinė", category: "B", instructor: "Nepriskirta", branch: "Centro skyrius", mileage: "21 360 km", status: "Laisva", statusKey: "available", service: "Po 8 640 km", technical: "2027-05-19", insurance: "2027-02-02", color: "#239574", bookings: 0 },
  { id: 5, make: "MAN TGL", plate: "CEN 440", year: 2021, gearbox: "Mechaninė", category: "C", instructor: "Tomas Noreika", branch: "Vakarų skyrius", mileage: "126 800 km", status: "Servise", statusKey: "service", service: "Vykdoma", technical: "2026-09-12", insurance: "2026-12-19", color: "#7a7d85", bookings: 4 },
];

const contracts = [
  { id: 1, number: "SUT-2026-1842", student: "Lukas Petrauskas", initials: "LP", email: "lukas.petrauskas@email.lt", course: "B kategorija", category: "B", branch: "Centro skyrius", created: "2026-06-03", signed: "2026-06-03", status: "Pasirašyta", statusKey: "signed", price: 400, paid: 300, color: "#e73f49", signature: "Elektroninis parašas", medical: "Galioja iki 2028-04-18", medicalKey: "valid", firstAid: "Gauta", firstAidKey: "valid" },
  { id: 2, number: "SUT-2026-1907", student: "Gabija Jankauskaitė", initials: "GJ", email: "gabija.j@email.lt", course: "B · automatas", category: "B", branch: "Šiaurės skyrius", created: "2026-06-18", signed: "Laukiama", status: "Laukia parašo", statusKey: "pending", price: 450, paid: 250, color: "#6575d8", signature: "Nuoroda išsiųsta el. paštu", medical: "Galioja iki 2027-09-12", medicalKey: "valid", firstAid: "Gauta", firstAidKey: "valid" },
  { id: 3, number: "SUT-2026-1611", student: "Mantas Žukauskas", initials: "MŽ", email: "mantas.z@email.lt", course: "B kategorija", category: "B", branch: "Centro skyrius", created: "2026-04-27", signed: "2026-04-27", status: "Pasirašyta", statusKey: "signed", price: 400, paid: 400, color: "#269b77", signature: "Parašas planšetėje", medical: "Galioja iki 2026-08-06", medicalKey: "expiring", firstAid: "Gauta", firstAidKey: "valid" },
  { id: 4, number: "SUT-2026-2044", student: "Emilija Kazlauskaitė", initials: "EK", email: "emilija.k@email.lt", course: "A2 kategorija", category: "A2", branch: "Pietų skyrius", created: "2026-07-14", signed: "Juodraštis", status: "Juodraštis", statusKey: "draft", price: 400, paid: 200, color: "#d6933b", signature: "Dar neišsiųsta", medical: "Galioja iki 2028-01-20", medicalKey: "valid", firstAid: "Trūksta", firstAidKey: "missing" },
  { id: 5, number: "SUT-2026-1779", student: "Austėja Vaitkutė", initials: "AV", email: "austeja.v@email.lt", course: "B · automatas", category: "B", branch: "Šiaurės skyrius", created: "2026-05-29", signed: "2026-05-29", status: "Trūksta dokumentų", statusKey: "attention", price: 450, paid: 450, color: "#b16a9d", signature: "Elektroninis parašas", medical: "Trūksta", medicalKey: "missing", firstAid: "Gauta", firstAidKey: "valid" },
  { id: 6, number: "SUT-2026-1963", student: "Tadas Norkus", initials: "TN", email: "tadas.n@email.lt", course: "C kategorija", category: "C", branch: "Vakarų skyrius", created: "2026-06-26", signed: "2026-06-27", status: "Pasirašyta", statusKey: "signed", price: 400, paid: 200, color: "#4c83b6", signature: "Elektroninis parašas", medical: "Galioja iki 2026-08-11", medicalKey: "expiring", firstAid: "Gauta", firstAidKey: "valid" },
];

const incomingDocuments = [
  { id: 1, student: "Austėja Vaitkutė", initials: "AV", color: "#b16a9d", type: "Medicininė pažyma", file: "medicinine_pazyma.pdf", source: "Mokinio savitarna", received: "Šiandien, 09:42", status: "Reikia patikrinti", statusKey: "review", confidence: 96, expiry: "2028-04-18", code: "4980312••••", note: "Visi privalomi laukai atpažinti" },
  { id: 2, student: "Gabija Jankauskaitė", initials: "GJ", color: "#6575d8", type: "Asmens dokumento kopija", file: "asmens_dokumentas.jpg", source: "El. paštas", received: "Šiandien, 08:17", status: "Patvirtinta", statusKey: "approved", confidence: 99, expiry: "2031-11-04", code: "5020721••••", note: "Automatiškai susieta su mokinio kortele" },
  { id: 3, student: "Emilija Kazlauskaitė", initials: "EK", color: "#d6933b", type: "Pirmosios pagalbos pažymėjimas", file: "pp_pazymejimas.pdf", source: "Nuskenuota filiale", received: "Vakar, 16:28", status: "Reikia patikslinti", statusKey: "issue", confidence: 87, expiry: "Neatpažinta", code: "5011018••••", note: "Neaiški dokumento galiojimo data" },
  { id: 4, student: "Tadas Norkus", initials: "TN", color: "#4c83b6", type: "Vairuotojo pažymėjimo kopija", file: "vairuotojo_pazymejimas.pdf", source: "Administracija", received: "Vakar, 14:05", status: "Patvirtinta", statusKey: "approved", confidence: 98, expiry: "2030-06-22", code: "4960526••••", note: "Dokumentas išsaugotas mokinio byloje" },
  { id: 5, student: "Lukas Petrauskas", initials: "LP", color: "#e73f49", type: "Medicininė pažyma", file: "sveikatos_pazyma.pdf", source: "Mokinio savitarna", received: "Liepos 19 d., 12:31", status: "Reikia patikrinti", statusKey: "review", confidence: 94, expiry: "2028-02-09", code: "4990824••••", note: "Rastas sutapimas su registracijos duomenimis" },
  { id: 6, student: "Mantas Žukauskas", initials: "MŽ", color: "#269b77", type: "Egzamino išlaikymo pažyma", file: "egzamino_pazyma.pdf", source: "El. paštas", received: "Liepos 18 d., 10:11", status: "Patvirtinta", statusKey: "approved", confidence: 97, expiry: "Netaikoma", code: "4971205••••", note: "Mokymų būsena atnaujinta automatiškai" },
];

const calendarEvents = [
  { id: 1, day: 0, time: "08:00", end: "09:30", student: "Lukas Petrauskas", initials: "LP", instructor: "Darius Siudikas", vehicle: "Toyota Corolla · JTD 248", category: "B", branch: "Centro skyrius", status: "Patvirtinta", statusKey: "confirmed", tone: "red", lesson: "19 pamoka", note: "Miesto maršrutai ir persirikiavimas" },
  { id: 2, day: 0, time: "11:00", end: "12:30", student: "Gabija Jankauskaitė", initials: "GJ", instructor: "Vesta Jankauskienė", vehicle: "Toyota Yaris · KET 909", category: "B", branch: "Šiaurės skyrius", status: "Laukia patvirtinimo", statusKey: "pending", tone: "blue", lesson: "10 pamoka", note: "Parkavimas ir apsisukimas" },
  { id: 3, day: 0, time: "15:30", end: "17:00", student: "Tadas Norkus", initials: "TN", instructor: "Tomas Noreika", vehicle: "MAN TGL · CEN 440", category: "C", branch: "Vakarų skyrius", status: "Patvirtinta", statusKey: "confirmed", tone: "green", lesson: "5 pamoka", note: "Važiavimas mieste" },
  { id: 4, day: 1, time: "09:30", end: "11:00", student: "Emilija Kazlauskaitė", initials: "EK", instructor: "Tomas Noreika", vehicle: "Honda CB500F", category: "A2", branch: "Pietų skyrius", status: "Patvirtinta", statusKey: "confirmed", tone: "amber", lesson: "3 pamoka", note: "Mokomoji aikštelė" },
  { id: 5, day: 1, time: "14:00", end: "15:30", student: "Austėja Vaitkutė", initials: "AV", instructor: "Vesta Jankauskienė", vehicle: "Toyota Yaris · KET 909", category: "B", branch: "Šiaurės skyrius", status: "Konfliktas", statusKey: "conflict", tone: "purple", lesson: "12 pamoka", note: "Automobilis tuo metu rezervuotas kitame filiale" },
  { id: 6, day: 2, time: "08:00", end: "09:30", student: "Mantas Žukauskas", initials: "MŽ", instructor: "Darius Siudikas", vehicle: "Volkswagen Golf · MOK 517", category: "B", branch: "Centro skyrius", status: "Patvirtinta", statusKey: "confirmed", tone: "green", lesson: "Baigiamasis važiavimas", note: "Egzamino maršruto kartojimas" },
  { id: 7, day: 2, time: "11:00", end: "12:30", student: "Lukas Petrauskas", initials: "LP", instructor: "Darius Siudikas", vehicle: "Toyota Corolla · JTD 248", category: "B", branch: "Centro skyrius", status: "Laukia patvirtinimo", statusKey: "pending", tone: "red", lesson: "20 pamoka", note: "Savarankiškas važiavimas" },
  { id: 8, day: 3, time: "09:30", end: "11:00", student: "Gabija Jankauskaitė", initials: "GJ", instructor: "Vesta Jankauskienė", vehicle: "Toyota Yaris · KET 909", category: "B", branch: "Šiaurės skyrius", status: "Patvirtinta", statusKey: "confirmed", tone: "blue", lesson: "11 pamoka", note: "Intensyvus eismas" },
  { id: 9, day: 3, time: "15:30", end: "17:00", student: "Emilija Kazlauskaitė", initials: "EK", instructor: "Tomas Noreika", vehicle: "Honda CB500F", category: "A2", branch: "Pietų skyrius", status: "Laukia patvirtinimo", statusKey: "pending", tone: "amber", lesson: "4 pamoka", note: "Manevravimas mažu greičiu" },
  { id: 10, day: 4, time: "08:00", end: "09:30", student: "Tadas Norkus", initials: "TN", instructor: "Tomas Noreika", vehicle: "MAN TGL · CEN 440", category: "C", branch: "Vakarų skyrius", status: "Patvirtinta", statusKey: "confirmed", tone: "green", lesson: "6 pamoka", note: "Krovininio automobilio valdymas" },
  { id: 11, day: 4, time: "14:00", end: "15:30", student: "Austėja Vaitkutė", initials: "AV", instructor: "Vesta Jankauskienė", vehicle: "Toyota Yaris · KET 909", category: "B", branch: "Šiaurės skyrius", status: "Patvirtinta", statusKey: "confirmed", tone: "purple", lesson: "13 pamoka", note: "Žiedinės sankryžos" },
];

const weekDays = [
  { day: "P", date: 20 }, { day: "A", date: 21 }, { day: "T", date: 22 },
  { day: "K", date: 23 }, { day: "Pn", date: 24 }, { day: "Š", date: 25 }, { day: "S", date: 26 },
];

export default function Home() {
  const [role, setRole] = useState<Role>("admin");
  const [activeNav, setActiveNav] = useState("Apžvalga");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState<"lesson" | "student" | null>(null);
  const [selectedDate, setSelectedDate] = useState(20);
  const [notice, setNotice] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("Visi skyriai");
  const [branchMenuOpen, setBranchMenuOpen] = useState(false);

  const activeBranch = branchOptions.find((branch) => branch.value === selectedBranch) ?? branchOptions[0];

  const visibleStudents = useMemo(
    () => students.filter((s) =>
      (selectedBranch === "Visi skyriai" || s.branch === selectedBranch) &&
      s.name.toLowerCase().includes(search.toLowerCase())
    ),
    [search, selectedBranch]
  );

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2600);
  }

  function selectRole(nextRole: Role) {
    setRole(nextRole);
    setActiveNav("Apžvalga");
    showNotice(`Rodoma: ${roleLabels[nextRole]} aplinka`);
  }

  function selectBranch(branch: (typeof branchOptions)[number]) {
    setSelectedBranch(branch.value);
    setBranchMenuOpen(false);
    showNotice(`Rodoma: ${branch.label}`);
  }

  if (activeNav === "Vieša registracija") {
    return <PublicRegistrationView onExit={() => setActiveNav("Apžvalga")} />;
  }

  return (
    <main className="app-shell">
      {mobileOpen && <button className="mobile-scrim" aria-label="Uždaryti meniu" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-head">
          <button className="icon-button close-menu" onClick={() => setMobileOpen(false)} aria-label="Uždaryti meniu"><Icon name="close" /></button>
        </div>

        <div className="role-switcher" aria-label="Pasirinkite aplinką">
          {(Object.keys(roleLabels) as Role[]).map((item) => (
            <button key={item} className={role === item ? "role-active" : ""} onClick={() => selectRole(item)}>
              {item === "admin" ? "Admin" : item === "instructor" ? "Instrukt." : "Mokinys"}
            </button>
          ))}
        </div>

        <nav className="main-nav" aria-label="Pagrindinis meniu">
          <p className="nav-label">PAGRINDINIS MENIU</p>
          {(role === "student" ? nav.slice(0, 4) : role === "instructor" ? nav.slice(0, 6) : nav).map((item) => (
            <button key={item.label} className={activeNav === item.label ? "nav-active" : ""} onClick={() => { setActiveNav(item.label); setMobileOpen(false); }}>
              <Icon name={item.icon} /><span>{item.label}</span>
              {item.label === "Sutartys" && role === "admin" && <span className="nav-badge">3</span>}
              {item.label === "Dokumentų srautas" && role === "admin" && <span className="nav-badge document-badge">4</span>}
              {item.label === "Vieša registracija" && role === "admin" && <span className="nav-new-badge">VIEŠA</span>}
            </button>
          ))}
        </nav>

        <div className="help-card">
          <div className="help-icon">?</div>
          <strong>Reikia pagalbos?</strong>
          <span>Susisiekite su administracija</span>
          <button onClick={() => showNotice("Užklausa išsiųsta administracijai")}>Rašyti žinutę</button>
        </div>

        <div className="profile-card">
          <div className="avatar">{role === "admin" ? "AJ" : role === "instructor" ? "DS" : "LP"}</div>
          <div><strong>{role === "admin" ? "Asta Juzumė" : role === "instructor" ? "Darius Siudikas" : "Lukas Petrauskas"}</strong><span>{roleLabels[role]}</span></div>
          <Icon name="chevron" size={17} />
        </div>
      </aside>

      <section className="content-area">
        <header className="topbar">
          <button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Atidaryti meniu"><Icon name="menu" /></button>
          {role === "admin" && <div className="branch-switcher-wrap">
            <button className={`branch-switcher ${branchMenuOpen ? "open" : ""}`} onClick={() => setBranchMenuOpen(!branchMenuOpen)} aria-haspopup="listbox" aria-expanded={branchMenuOpen}>
              <span className="branch-switcher-icon"><Icon name="map" size={18}/></span>
              <span><small>RODOMAS SKYRIUS</small><strong>{activeBranch.label}</strong></span>
              <Icon name="chevron" size={16}/>
            </button>
            {branchMenuOpen && <div className="branch-menu" role="listbox" aria-label="Pasirinkite skyrių">
              <div className="branch-menu-head"><span>Pasirinkite skyrių</span><small>Pasirinkimas taikomas visiems moduliams</small></div>
              {branchOptions.map((branch) => <button key={branch.value} className={selectedBranch === branch.value ? "active" : ""} onClick={() => selectBranch(branch)} role="option" aria-selected={selectedBranch === branch.value}>
                <span className="branch-option-icon"><Icon name={branch.value === "Visi skyriai" ? "home" : "map"} size={16}/></span>
                <span><strong>{branch.label}</strong><small>{branch.meta}</small></span>
                {selectedBranch === branch.value && <i><Icon name="check" size={13}/></i>}
              </button>)}
            </div>}
          </div>}
          <div className="search-box">
            <Icon name="search" size={18} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ieškoti mokinio, sutarties..." aria-label="Paieška" />
            <kbd>⌘ K</kbd>
          </div>
          <div className="top-actions">
            <div className="notification-wrap">
              <button className="icon-button notification-button" onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Pranešimai"><Icon name="bell" /><span /></button>
              {notificationsOpen && (
                <div className="notification-popover">
                  <div className="popover-head"><strong>Pranešimai</strong><button onClick={() => showNotice("Visi pranešimai pažymėti kaip perskaityti")}>Pažymėti visus</button></div>
                  <div className="notice-item"><span className="notice-dot red"/><div><strong>Laukiama sutarties</strong><p>Gabijos sutartis paruošta pasirašymui.</p><small>Prieš 12 min.</small></div></div>
                  <div className="notice-item"><span className="notice-dot green"/><div><strong>Važiavimas patvirtintas</strong><p>Lukas patvirtino rytojaus laiką.</p><small>Prieš 1 val.</small></div></div>
                </div>
              )}
            </div>
            <button className="primary-button" onClick={() => setModal(role === "admin" ? "student" : "lesson")}><Icon name="plus" size={18}/><span>{role === "admin" ? "Naujas mokinys" : "Rezervuoti laiką"}</span></button>
          </div>
        </header>

        <div className="page-wrap">
          {activeNav === "Sutartys" ? (
            <ContractsModule onBack={() => setActiveNav("Apžvalga")} showNotice={showNotice} selectedBranch={selectedBranch} />
          ) : activeNav === "Dokumentų srautas" ? (
            <DocumentFlowModule onBack={() => setActiveNav("Apžvalga")} showNotice={showNotice} selectedBranch={selectedBranch} />
          ) : activeNav === "Kalendorius" ? (
            <CalendarModule onBack={() => setActiveNav("Apžvalga")} showNotice={showNotice} selectedBranch={selectedBranch} />
          ) : activeNav === "Mokiniai" ? (
            <StudentsModule onBack={() => setActiveNav("Apžvalga")} onAdd={()=>setModal("student")} showNotice={showNotice} selectedBranch={selectedBranch} />
          ) : activeNav === "Transportas" ? (
            <TransportModule onBack={() => setActiveNav("Apžvalga")} showNotice={showNotice} selectedBranch={selectedBranch} />
          ) : activeNav === "Vairavimo žurnalas" ? (
            <DrivingJournalModule onBack={() => setActiveNav("Apžvalga")} showNotice={showNotice} selectedBranch={selectedBranch} role={role} />
          ) : activeNav === "Ataskaitos" ? (
            <ReportsModule key={selectedBranch} onBack={() => setActiveNav("Apžvalga")} showNotice={showNotice} selectedBranch={selectedBranch} />
          ) : activeNav !== "Apžvalga" ? (
            <ModulePlaceholder title={activeNav} role={role} onBack={() => setActiveNav("Apžvalga")} onAction={() => setModal(activeNav === "Mokiniai" ? "student" : "lesson")} />
          ) : role === "admin" ? (
            <AdminDashboard setModal={setModal} selectedDate={selectedDate} setSelectedDate={setSelectedDate} visibleStudents={visibleStudents} showNotice={showNotice} onOpenDocuments={()=>setActiveNav("Dokumentų srautas")} selectedBranch={selectedBranch} branch={activeBranch} />
          ) : role === "instructor" ? (
            <InstructorDashboard setModal={setModal} selectedDate={selectedDate} setSelectedDate={setSelectedDate} showNotice={showNotice} />
          ) : (
            <StudentDashboard setModal={setModal} selectedDate={selectedDate} setSelectedDate={setSelectedDate} showNotice={showNotice} />
          )}
        </div>
      </section>

      {modal && <ActionModal type={modal} role={role} onClose={() => setModal(null)} onSave={() => { setModal(null); showNotice(modal === "student" ? "Mokinys užregistruotas, mokėjimas gautas ir kvitas išsiųstas" : "Važiavimo laikas rezervuotas"); }} />}
      {notice && <div className="toast"><span><Icon name="check" size={16}/></span>{notice}</div>}
    </main>
  );
}

function PageHeading({ eyebrow, title, text, action }: { eyebrow: string; title: string; text: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div><p>{eyebrow}</p><h1>{title}</h1><span>{text}</span></div>{action}</div>;
}

function StatCard({ icon, label, value, note, tone }: { icon: IconName; label: string; value: string; note: string; tone: string }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon name={icon}/></div><div><p>{label}</p><strong>{value}</strong><span>{note}</span></div><button aria-label={`Atidaryti ${label}`}><Icon name="arrow" size={17}/></button></article>;
}

function WeekStrip({ selectedDate, setSelectedDate }: { selectedDate: number; setSelectedDate: (n:number) => void }) {
  return <div className="week-strip">{weekDays.map((d) => <button key={d.date} className={selectedDate === d.date ? "date-active" : ""} onClick={() => setSelectedDate(d.date)}><span>{d.day}</span><strong>{d.date}</strong>{[20,22,24].includes(d.date) && <i/>}</button>)}</div>;
}

function LessonList({ compact = false, showNotice, items = lessons }: { compact?: boolean; showNotice: (m:string)=>void; items?: typeof lessons }) {
  return <div className={`lesson-list ${compact ? "compact" : ""}`}>{items.map((lesson) => <button key={`${lesson.time}-${lesson.name}`} className="lesson-row" onClick={() => showNotice(`Atidaryta ${lesson.name} pamoka`)}><div className="lesson-time"><strong>{lesson.time}</strong><span>{lesson.end}</span></div><i className={`lesson-line ${lesson.tone}`}/><div className="lesson-main"><strong>{lesson.name}</strong><span>{lesson.type}</span><small><Icon name="car" size={14}/>{lesson.place}</small></div><span className="lesson-arrow"><Icon name="chevron" size={16}/></span></button>)}</div>;
}

function AdminDashboard({ setModal, selectedDate, setSelectedDate, visibleStudents, showNotice, onOpenDocuments, selectedBranch, branch }: { setModal: (m:"lesson"|"student")=>void; selectedDate:number; setSelectedDate:(n:number)=>void; visibleStudents:typeof students; showNotice:(m:string)=>void; onOpenDocuments:()=>void; selectedBranch:string; branch:(typeof branchOptions)[number] }) {
  const branchLessons = selectedBranch === "Visi skyriai" ? lessons : lessons.filter((lesson) => lesson.place === selectedBranch);
  return <>
    <PageHeading eyebrow={`PIRMADIENIS, LIEPOS 20 · ${branch.label.toUpperCase()}`} title="Labas, Asta 👋" text={selectedBranch === "Visi skyriai" ? "Štai kas šiandien vyksta visuose mokyklos skyriuose." : `Rodoma tik ${branch.meta} informacija.`} action={<button className="secondary-button" onClick={() => setModal("lesson")}><Icon name="calendar" size={18}/>Planuoti važiavimą</button>}/>
    <div className="stats-grid">
      <StatCard icon="users" label="Aktyvūs mokiniai" value={String(branch.students)} note={selectedBranch === "Visi skyriai" ? "↑ 12 šį mėnesį" : "Šiame skyriuje"} tone="red"/>
      <StatCard icon="calendar" label="Šiandienos važiavimai" value={String(branch.lessons)} note={branch.lessons > 3 ? "3 dar nepatvirtinti" : "Visi patvirtinti"} tone="blue"/>
      <StatCard icon="file" label="Laukia pasirašymo" value={String(branch.contracts)} note={branch.contracts ? "Sutartys paruoštos" : "Nėra laukiančių"} tone="amber"/>
      <StatCard icon="card" label="Mėnesio pajamos" value={branch.revenue} note="↑ 8,4% nuo birželio" tone="green"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel schedule-panel"><div className="panel-head"><div><h2>Šiandienos grafikas</h2><p>{selectedBranch === "Visi skyriai" ? "Visų skyrių instruktorių važiavimai" : branch.label}</p></div><button onClick={() => showNotice("Atidarytas visas kalendorius")}>Visas kalendorius <Icon name="arrow" size={16}/></button></div><WeekStrip selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>{branchLessons.length ? <LessonList showNotice={showNotice} items={branchLessons}/> : <div className="branch-empty-schedule"><Icon name="calendar" size={24}/><strong>Šiandien suplanuoti {branch.lessons} važiavimai</strong><span>Detali pamokų informacija būtų gaunama iš pasirinkto skyriaus kalendoriaus.</span></div>}</section>
      <section className="panel progress-panel"><div className="panel-head"><div><h2>Mokinių progresas</h2><p>Reikalingas jūsų dėmesys</p></div><button onClick={() => showNotice("Atidarytas mokinių sąrašas")}>Visi mokiniai <Icon name="arrow" size={16}/></button></div><div className="student-list">{visibleStudents.slice(0,4).map((student) => <button key={student.name} onClick={() => showNotice(`Atidaryta ${student.name} kortelė`)}><span className="student-avatar" style={{background:student.color}}>{student.initials}</span><div className="student-info"><strong>{student.name}</strong><span>{student.course}</span><div className="progress-track"><i style={{width:`${student.progress}%`, background:student.color}}/></div></div><div className="student-hours"><strong>{student.hours}</strong><span>{student.status}</span></div></button>)}</div></section>
    </div>
    <section className="panel quick-panel"><div><span className="spark">✦</span><div><h2>Greitieji veiksmai</h2><p>Dažniausiai naudojamos funkcijos vienoje vietoje</p></div></div><div className="quick-actions"><button onClick={() => setModal("student")}><span><Icon name="users"/></span><div><strong>Registruoti mokinį</strong><small>Sukurti kortelę ir sutartį</small></div><Icon name="chevron" size={16}/></button><button onClick={() => setModal("lesson")}><span><Icon name="calendar"/></span><div><strong>Rezervuoti važiavimą</strong><small>Rasti laisvą laiką</small></div><Icon name="chevron" size={16}/></button><button onClick={onOpenDocuments}><span><Icon name="inbox"/></span><div><strong>Apdoroti dokumentus</strong><small>4 įrašams reikia dėmesio</small></div><Icon name="chevron" size={16}/></button></div></section>
  </>;
}

function InstructorDashboard({ setModal, selectedDate, setSelectedDate, showNotice }: { setModal:(m:"lesson")=>void; selectedDate:number; setSelectedDate:(n:number)=>void; showNotice:(m:string)=>void }) {
  return <>
    <PageHeading eyebrow="PIRMADIENIS, LIEPOS 20" title="Labas, Dariau 👋" text="Šiandien turite 5 važiavimus. Pirmasis – 09:00." action={<button className="primary-button standalone" onClick={() => setModal("lesson")}><Icon name="plus" size={18}/>Rezervuoti laiką</button>}/>
    <div className="stats-grid instructor-stats"><StatCard icon="calendar" label="Šiandien" value="5 pamokos" note="7,5 darbo valandos" tone="red"/><StatCard icon="clock" label="Šią savaitę" value="24 pamokos" note="36 darbo valandos" tone="blue"/><StatCard icon="users" label="Mano mokiniai" value="18" note="2 artėja prie egzamino" tone="green"/></div>
    <div className="dashboard-grid instructor-grid"><section className="panel schedule-panel"><div className="panel-head"><div><h2>Mano grafikas</h2><p>Liepos 20–26 d.</p></div></div><WeekStrip selectedDate={selectedDate} setSelectedDate={setSelectedDate}/><LessonList showNotice={showNotice}/></section><section className="panel focus-card"><span className="focus-label">KITA PAMOKA</span><div className="focus-time">09:00 <small>– 10:30</small></div><h3>Lukas Petrauskas</h3><p>B kategorija · 18 pamoka</p><div className="route-box"><Icon name="car"/><div><span>Susitikimo vieta</span><strong>Centro skyrius</strong></div></div><button onClick={() => showNotice("Pamoka pradėta")}>Pradėti pamoką <Icon name="arrow" size={17}/></button></section></div>
  </>;
}

function StudentDashboard({ setModal, selectedDate, setSelectedDate, showNotice }: { setModal:(m:"lesson")=>void; selectedDate:number; setSelectedDate:(n:number)=>void; showNotice:(m:string)=>void }) {
  return <>
    <PageHeading eyebrow="B KATEGORIJA · AUTOMATAS" title="Labas, Lukai 👋" text="Iki mokymų pabaigos liko 7,5 praktinio vairavimo valandos." action={<button className="primary-button standalone" onClick={() => setModal("lesson")}><Icon name="plus" size={18}/>Užsisakyti važiavimą</button>}/>
    <div className="student-hero">
      <div className="student-progress"><div className="ring" style={{"--progress":"75%"} as React.CSSProperties}><div><strong>75%</strong><span>baigta</span></div></div><div><span className="pill">B kategorija</span><h2>Puikiai sekasi!</h2><p>Jau pravažiavai 22,5 iš 30 valandų. Dar keli važiavimai ir būsi pasiruošęs egzaminui.</p><div className="mini-stats"><span><strong>22,5</strong>Pravažiuota</span><span><strong>7,5</strong>Liko valandų</span><span><strong>4,8</strong>Įvertinimas</span></div></div></div>
      <div className="next-lesson"><span>KITAS VAŽIAVIMAS</span><strong>Antradienį, 09:00</strong><p>Su instruktoriumi Dariumi Siudiku</p><div><Icon name="car"/><span>Centro skyrius</span></div><button onClick={() => showNotice("Važiavimas patvirtintas")}>Patvirtinti dalyvavimą</button></div>
    </div>
    <div className="dashboard-grid student-grid"><section className="panel schedule-panel"><div className="panel-head"><div><h2>Laisvi laikai</h2><p>Pasirinkite patogią dieną</p></div></div><WeekStrip selectedDate={selectedDate} setSelectedDate={setSelectedDate}/><div className="time-slots">{["09:00", "11:00", "14:00", "16:00"].map((t,i)=><button key={t} disabled={i===1} onClick={()=>setModal("lesson")}><strong>{t}</strong><span>{i===1 ? "Užimta" : "Laisva"}</span></button>)}</div></section><section className="panel document-card"><div className="doc-icon"><Icon name="file"/></div><h2>Mokymo sutartis</h2><p>Sutartis Nr. SUT-2026-1842</p><div className="doc-status"><Icon name="check" size={15}/>Pasirašyta 2026-07-02</div><button onClick={()=>showNotice("Sutarties peržiūra atidaryta")}>Peržiūrėti sutartį <Icon name="arrow" size={16}/></button></section></div>
  </>;
}

function ContractsModule({ onBack, showNotice, selectedBranch }: { onBack:()=>void; showNotice:(m:string)=>void; selectedBranch:string }) {
  const [status,setStatus]=useState("all");
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("Visos kategorijos");
  const [documentStatus,setDocumentStatus]=useState("Visi dokumentai");
  const [selected,setSelected]=useState<(typeof contracts)[number]|null>(null);
  const [createOpen,setCreateOpen]=useState(false);
  const branchSummary=branchOptions.find((branch)=>branch.value===selectedBranch)??branchOptions[0];
  const contractTotal=selectedBranch==="Visi skyriai"?248:branchSummary.students;
  const pendingTotal=branchSummary.contracts;
  const draftTotal=selectedBranch==="Visi skyriai"?4:Math.max(1,Math.round(contractTotal/62));
  const attentionTotal=selectedBranch==="Visi skyriai"?2:Math.max(1,Math.round(contractTotal/124));
  const signedTotal=Math.max(0,contractTotal-pendingTotal-draftTotal-attentionTotal);
  const filtered=contracts.filter((contract)=>{
    const branchMatches=selectedBranch==="Visi skyriai"||contract.branch===selectedBranch;
    const statusMatches=status==="all"||contract.statusKey===status;
    const categoryMatches=category==="Visos kategorijos"||contract.category===category;
    const docsMatch=documentStatus==="Visi dokumentai"||(documentStatus==="Trūksta dokumentų"&&(contract.medicalKey==="missing"||contract.firstAidKey==="missing"))||(documentStatus==="Baigia galioti"&&contract.medicalKey==="expiring");
    return branchMatches&&statusMatches&&categoryMatches&&docsMatch&&`${contract.student} ${contract.number} ${contract.email}`.toLowerCase().includes(query.toLowerCase());
  });
  return <div className="contracts-page">
    <button className="back-link" onClick={onBack}>← Grįžti į apžvalgą</button>
    <PageHeading eyebrow="SUTARTYS IR DOKUMENTAI" title="Sutartys" text="Sutarčių rengimas, pasirašymas ir mokinių dokumentų galiojimo kontrolė." action={<button className="primary-button standalone" onClick={()=>setCreateOpen(true)}><Icon name="plus" size={18}/>Nauja sutartis</button>}/>

    <div className="contract-stats">
      <StatCard icon="file" label="Visos sutartys" value={String(contractTotal)} note={selectedBranch==="Visi skyriai"?"Visuose skyriuose":branchSummary.label} tone="red"/>
      <StatCard icon="clock" label="Laukia parašo" value={String(pendingTotal)} note={pendingTotal?"Reikia priminti":"Nėra laukiančių"} tone="blue"/>
      <StatCard icon="shield" label="Baigia galioti" value={String(selectedBranch==="Visi skyriai"?6:Math.max(1,Math.round(contractTotal/41)))} note="Per artimiausias 30 d." tone="amber"/>
      <StatCard icon="check" label="Dokumentai tvarkingi" value={String(signedTotal)} note="Pasirinktame rodinyje" tone="green"/>
    </div>

    <section className="panel contracts-panel">
      <div className="contracts-toolbar">
        <div className="contract-status-tabs" aria-label="Sutarčių būsenos">{[{key:"all",label:"Visos",count:contractTotal},{key:"signed",label:"Pasirašytos",count:signedTotal},{key:"pending",label:"Laukia parašo",count:pendingTotal},{key:"draft",label:"Juodraščiai",count:draftTotal},{key:"attention",label:"Reikia dėmesio",count:attentionTotal}].map((tab)=><button key={tab.key} className={status===tab.key?"active":""} onClick={()=>setStatus(tab.key)}>{tab.label}<span>{tab.count}</span></button>)}</div>
        <div className="contract-filters"><label className="contract-search"><Icon name="search" size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Mokinys arba sutarties numeris" aria-label="Ieškoti sutarties"/></label><label><Icon name="filter" size={14}/><select value={category} onChange={(e)=>setCategory(e.target.value)} aria-label="Sutarties kategorija"><option>Visos kategorijos</option><option>B</option><option>A2</option><option>C</option></select></label><label><Icon name="shield" size={14}/><select value={documentStatus} onChange={(e)=>setDocumentStatus(e.target.value)} aria-label="Dokumentų būsena"><option>Visi dokumentai</option><option>Trūksta dokumentų</option><option>Baigia galioti</option></select></label></div>
      </div>
      <div className="contracts-table-head"><span>MOKINYS</span><span>SUTARTIS</span><span>SUKURTA</span><span>KAINA / APMOKĖTA</span><span>DOKUMENTAI</span><span>BŪSENA</span><span/></div>
      <div className="contracts-list">{filtered.map((contract)=><button className="contract-row" key={contract.id} onClick={()=>setSelected(contract)}><span className="contract-student"><i style={{background:contract.color}}>{contract.initials}</i><span><strong>{contract.student}</strong><small>{contract.course} · {contract.branch}</small></span></span><span className="contract-number"><strong>{contract.number}</strong><small>{contract.signature}</small></span><span className="contract-date"><strong>{contract.created}</strong><small>{contract.signed==="Laukiama"||contract.signed==="Juodraštis"?contract.signed:`Pasirašyta ${contract.signed}`}</small></span><span className="contract-money"><strong>{contract.price} €</strong><small>Apmokėta {contract.paid} €</small></span><span className="contract-docs"><i className={contract.medicalKey}>MED</i><i className={contract.firstAidKey}>PP</i><small>{contract.medicalKey==="missing"||contract.firstAidKey==="missing"?"Trūksta":contract.medicalKey==="expiring"?"Baigia galioti":"Tvarkingi"}</small></span><span><i className={`contract-status ${contract.statusKey}`}>{contract.status}</i></span><span className="row-arrow"><Icon name="chevron" size={17}/></span></button>)}{filtered.length===0&&<div className="contracts-empty"><Icon name="file" size={30}/><strong>Sutarčių nerasta</strong><span>Pakeiskite paiešką arba filtrus.</span></div>}</div>
      <div className="contracts-footer"><span>Rodomos {filtered.length} iš {contractTotal} sutarčių</span><div><button disabled>‹</button><button className="active">1</button><button>2</button><button>3</button><button>…</button><button>25</button><button>›</button></div></div>
    </section>

    <div className="documents-bottom-grid">
      <section className="panel expiring-docs-card"><div className="panel-head"><div><h2>Baigiantys galioti dokumentai</h2><p>Per artimiausias 30 dienų</p></div><button onClick={()=>setDocumentStatus("Baigia galioti")}>Rodyti visus <Icon name="arrow" size={15}/></button></div><div className="expiring-docs-list"><button onClick={()=>setSelected(contracts[2])}><span className="doc-warning-icon"><Icon name="shield" size={18}/></span><div><strong>Mantas Žukauskas</strong><small>Medicininė pažyma · iki 2026-08-06</small></div><em>17 d.</em></button><button onClick={()=>setSelected(contracts[5])}><span className="doc-warning-icon"><Icon name="shield" size={18}/></span><div><strong>Tadas Norkus</strong><small>Medicininė pažyma · iki 2026-08-11</small></div><em>22 d.</em></button></div></section>
      <section className="panel templates-card"><div className="panel-head"><div><h2>Sutarčių šablonai</h2><p>Naudojami generuojant sutartis</p></div></div><div className="template-list"><button onClick={()=>showNotice("Atidarytas B kategorijos šablonas")}><span><Icon name="file" size={18}/></span><div><strong>B kategorijos mokymo sutartis</strong><small>Atnaujinta 2026-06-01 · v.4</small></div><Icon name="chevron" size={15}/></button><button onClick={()=>showNotice("Atidarytas profesinio mokymo šablonas")}><span><Icon name="file" size={18}/></span><div><strong>Profesinio mokymo sutartis</strong><small>C, CE ir D kategorijoms · v.2</small></div><Icon name="chevron" size={15}/></button></div></section>
    </div>
    {selected&&<ContractDrawer contract={selected} onClose={()=>setSelected(null)} showNotice={showNotice}/>}
    {createOpen&&<ContractCreateModal onClose={()=>setCreateOpen(false)} onSave={()=>{setCreateOpen(false);showNotice("Sutartis sukurta ir išsiųsta pasirašyti")}}/>}
  </div>;
}

function ContractDrawer({ contract,onClose,showNotice }: { contract:(typeof contracts)[number]; onClose:()=>void; showNotice:(m:string)=>void }) {
  const [tab,setTab]=useState("contract");
  return <div className="drawer-layer" role="dialog" aria-modal="true" aria-label={`${contract.number} sutarties kortelė`}><button className="drawer-scrim" onClick={onClose} aria-label="Uždaryti"/><aside className="contract-drawer"><div className="contract-drawer-head"><button className="icon-button" onClick={onClose} aria-label="Uždaryti"><Icon name="close"/></button><span>SUTARTIES KORTELĖ</span><h2>{contract.number}</h2><p>{contract.student} · {contract.course}</p><i className={`contract-status ${contract.statusKey}`}>{contract.status}</i></div><div className="contract-drawer-actions"><button onClick={()=>showNotice("Sutarties PDF paruoštas peržiūrai")}><Icon name="file" size={16}/>Peržiūrėti PDF</button><button onClick={()=>showNotice("Sutarties kopija išsiųsta mokiniui")}><span>✉</span>Siųsti</button><button onClick={()=>showNotice("Sutarties duomenys redaguojami")}><span>✎</span>Redaguoti</button></div><div className="contract-drawer-tabs"><button className={tab==="contract"?"active":""} onClick={()=>setTab("contract")}>Sutartis</button><button className={tab==="documents"?"active":""} onClick={()=>setTab("documents")}>Dokumentai</button><button className={tab==="history"?"active":""} onClick={()=>setTab("history")}>Istorija</button></div>
    {tab==="contract"&&<div className="contract-drawer-content"><div className="contract-parties"><span className="student-card-avatar" style={{background:contract.color}}>{contract.initials}</span><div><small>Mokinys</small><strong>{contract.student}</strong><p>{contract.email}</p></div><button onClick={()=>showNotice("Mokinio kortelė atidaryta")}><Icon name="chevron" size={15}/></button></div><div className="contract-info-grid"><div><span>Mokymų kategorija</span><strong>{contract.course}</strong></div><div><span>Filialas</span><strong>{contract.branch}</strong></div><div><span>Sutarties data</span><strong>{contract.created}</strong></div><div><span>Kurso kaina</span><strong>{contract.price} €</strong></div></div><h3>Pasirašymas</h3><div className={`signature-status-card ${contract.statusKey}`}><span><Icon name={contract.statusKey==="signed"?"check":"clock"} size={19}/></span><div><strong>{contract.statusKey==="signed"?"Sutartis pasirašyta":contract.statusKey==="pending"?"Laukiama mokinio parašo":"Sutartis dar neparuošta pasirašymui"}</strong><small>{contract.signature}{contract.statusKey==="signed"?` · ${contract.signed}`:""}</small></div>{contract.statusKey==="pending"&&<button onClick={()=>showNotice("Priminimas pasirašyti išsiųstas")}>Priminti</button>}</div><h3>Mokėjimų planas</h3><div className="contract-payment-summary"><div><span>Kurso kaina</span><strong>{contract.price} €</strong></div><div><span>Apmokėta</span><strong>{contract.paid} €</strong></div><div><span>Likutis</span><strong>{contract.price-contract.paid} €</strong></div></div></div>}
    {tab==="documents"&&<div className="contract-drawer-content"><div className="linked-document"><span><Icon name="file" size={20}/></span><div><small>PAGRINDINIS DOKUMENTAS</small><strong>Mokymo sutartis {contract.number}</strong><p>PDF · sugeneruota {contract.created}</p></div><i className={`contract-status ${contract.statusKey}`}>{contract.status}</i><button onClick={()=>showNotice("Sutarties dokumentas atidarytas")}><Icon name="chevron" size={15}/></button></div><div className="linked-document"><span><Icon name="shield" size={20}/></span><div><small>MOKINIO DOKUMENTAS</small><strong>Medicininė pažyma</strong><p>{contract.medical}</p></div><i className={`doc-state ${contract.medicalKey}`}>{contract.medicalKey==="valid"?"Galioja":contract.medicalKey==="expiring"?"Baigia galioti":"Trūksta"}</i><button onClick={()=>showNotice(contract.medicalKey==="missing"?"Dokumento įkėlimo langas atidarytas":"Dokumentas atidarytas")}><Icon name="chevron" size={15}/></button></div><div className="linked-document"><span><Icon name="book" size={20}/></span><div><small>MOKINIO DOKUMENTAS</small><strong>Pirmosios pagalbos pažymėjimas</strong><p>{contract.firstAid}</p></div><i className={`doc-state ${contract.firstAidKey}`}>{contract.firstAidKey==="valid"?"Gauta":"Trūksta"}</i><button onClick={()=>showNotice(contract.firstAidKey==="missing"?"Dokumento įkėlimo langas atidarytas":"Dokumentas atidarytas")}><Icon name="chevron" size={15}/></button></div><button className="secondary-button drawer-full-button" onClick={()=>showNotice("Dokumento įkėlimo langas atidarytas")}><Icon name="plus" size={16}/>Pridėti dokumentą</button></div>}
    {tab==="history"&&<div className="contract-drawer-content"><div className="contract-history"><div className="done"><i><Icon name="check" size={12}/></i><span><strong>Sutartis sukurta</strong><small>{contract.created} · Asta Juzumė</small><p>Naudotas B kategorijos sutarties šablonas v.4.</p></span></div><div className={contract.statusKey==="draft"?"pending":"done"}><i><Icon name={contract.statusKey==="draft"?"clock":"check"} size={12}/></i><span><strong>Išsiųsta pasirašyti</strong><small>{contract.statusKey==="draft"?"Dar neišsiųsta":`${contract.created} · el. paštu`}</small></span></div><div className={contract.statusKey==="signed"?"done":"pending"}><i><Icon name={contract.statusKey==="signed"?"check":"clock"} size={12}/></i><span><strong>Mokinys pasirašė</strong><small>{contract.statusKey==="signed"?`${contract.signed} · ${contract.signature}`:"Laukiama"}</small></span></div></div></div>}
    <div className="contract-drawer-footer">{contract.statusKey==="pending"?<button className="primary-button" onClick={()=>showNotice("Priminimas pasirašyti išsiųstas")}>Siųsti priminimą</button>:<button className="secondary-button" onClick={()=>showNotice("Sutarties kopija sukurta")}>Kurti kopiją</button>}<button className="secondary-button danger-button" onClick={()=>showNotice("Sutarties anuliavimo patvirtinimas atidarytas")}>Anuliuoti sutartį</button></div></aside></div>;
}

function ContractCreateModal({ onClose,onSave }: { onClose:()=>void; onSave:()=>void }) {
  const [step,setStep]=useState(1);
  const [signature,setSignature]=useState("Nuoroda el. paštu");
  return <div className="modal-layer" role="dialog" aria-modal="true" aria-label="Naujos sutarties kūrimas"><button className="modal-scrim" onClick={onClose} aria-label="Uždaryti"/><div className="modal-card contract-create-modal"><div className="modal-head"><div><span>NAUJA SUTARTIS</span><h2>{step===1?"Pasirinkite mokinį":step===2?"Sutarties sąlygos":"Peržiūra ir pasirašymas"}</h2></div><button className="icon-button" onClick={onClose} aria-label="Uždaryti"><Icon name="close"/></button></div><div className="steps"><i className="active">1</i><span/><i className={step>=2?"active":""}>2</i><span/><i className={step>=3?"active":""}>3</i></div>{step===1&&<div><label className="contract-student-search"><Icon name="search" size={16}/><input placeholder="Ieškoti mokinio..."/></label><div className="select-student-list"><button className="active"><span className="student-card-avatar" style={{background:"#e73f49"}}>LP</span><div><strong>Lukas Petrauskas</strong><small>lukas.petrauskas@email.lt · B kategorija</small></div><i><Icon name="check" size={14}/></i></button><button><span className="student-card-avatar" style={{background:"#6575d8"}}>GJ</span><div><strong>Gabija Jankauskaitė</strong><small>gabija.j@email.lt · B automatas</small></div></button><button><span className="student-card-avatar" style={{background:"#d6933b"}}>EK</span><div><strong>Emilija Kazlauskaitė</strong><small>emilija.k@email.lt · A2 kategorija</small></div></button></div></div>}{step===2&&<div className="form-grid"><label className="wide"><span>Sutarties šablonas</span><select><option>B kategorijos mokymo sutartis · v.4</option><option>Profesinio mokymo sutartis · v.2</option></select></label><label><span>Mokymų kategorija</span><select><option>B kategorija</option><option>B · automatas</option><option>A2 kategorija</option></select></label><label><span>Filialas</span><select><option>Centro skyrius</option><option>Šiaurės skyrius</option></select></label><label><span>Kurso kaina</span><input defaultValue="400 €"/></label><label><span>Pradinis mokėjimas</span><input defaultValue="200 €"/></label><label className="wide"><span>Papildomos sąlygos</span><input placeholder="Jei reikia, įrašykite papildomas sąlygas..."/></label></div>}{step===3&&<div><div className="contract-preview-card"><strong className="preview-document-title">VAIRAVIMO MOKYMO SUTARTIS</strong><span>Sutartis Nr. bus suteiktas automatiškai</span><div className="preview-lines"><i/><i/><i/><i/><i/></div><div className="preview-signatures"><span>Mokyklos atstovas</span><span>Mokinys</span></div></div><div className="signature-methods"><span>Pasirašymo būdas</span><div>{["Nuoroda el. paštu","Parašas planšetėje","Įkelti pasirašytą PDF"].map((method)=><button key={method} className={signature===method?"active":""} onClick={()=>setSignature(method)}><i>{method==="Nuoroda el. paštu"?"✉":method==="Parašas planšetėje"?"✎":"↑"}</i><strong>{method}</strong></button>)}</div></div></div>}<div className="modal-actions"><button className="secondary-button" onClick={step===1?onClose:()=>setStep(step-1)}>{step===1?"Atšaukti":"Atgal"}</button>{step<3?<button className="primary-button" onClick={()=>setStep(step+1)}>Toliau <Icon name="arrow" size={16}/></button>:<button className="primary-button" onClick={onSave}><Icon name="check" size={16}/>{signature==="Nuoroda el. paštu"?"Sukurti ir siųsti":"Sukurti sutartį"}</button>}</div></div></div>;
}

function DocumentFlowModule({ onBack, showNotice, selectedBranch }: { onBack:()=>void; showNotice:(m:string)=>void; selectedBranch:string }) {
  const [status,setStatus]=useState("all");
  const [query,setQuery]=useState("");
  const [source,setSource]=useState("Visi šaltiniai");
  const [selected,setSelected]=useState<(typeof incomingDocuments)[number]|null>(null);
  const [uploadOpen,setUploadOpen]=useState(false);
  const branchDocuments=incomingDocuments.filter((document)=>selectedBranch==="Visi skyriai"||students.find((student)=>student.name===document.student)?.branch===selectedBranch);
  const filtered=incomingDocuments.filter((document)=>
    (selectedBranch==="Visi skyriai"||students.find((student)=>student.name===document.student)?.branch===selectedBranch)&&
    (status==="all"||document.statusKey===status)&&
    (source==="Visi šaltiniai"||document.source===source)&&
    `${document.student} ${document.type} ${document.file}`.toLowerCase().includes(query.toLowerCase())
  );
  const tabs=[{key:"all",label:"Visi",count:branchDocuments.length},{key:"review",label:"Reikia patikrinti",count:branchDocuments.filter(d=>d.statusKey==="review").length},{key:"approved",label:"Patvirtinti",count:branchDocuments.filter(d=>d.statusKey==="approved").length},{key:"issue",label:"Su neaiškumais",count:branchDocuments.filter(d=>d.statusKey==="issue").length}];
  return <div className="document-flow-page">
    <button className="back-link" onClick={onBack}>← Grįžti į apžvalgą</button>
    <PageHeading eyebrow="DOKUMENTŲ AUTOMATIZAVIMAS" title="Dokumentų srautas" text="Gaukite, nuskaitykite, patikrinkite ir suarchyvuokite dokumentus vienoje vietoje." action={<button className="primary-button standalone" onClick={()=>setUploadOpen(true)}><Icon name="upload" size={18}/>Įkelti dokumentą</button>}/>

    <div className="document-flow-stats">
      <StatCard icon="inbox" label="Gauta šiandien" value={String(branchDocuments.length)} note="Iš skirtingų šaltinių" tone="red"/>
      <StatCard icon="clock" label="Reikia patikrinti" value={String(branchDocuments.filter(d=>d.statusKey==="review").length)} note="Vidutiniškai 1 min. įrašui" tone="blue"/>
      <StatCard icon="check" label="Patvirtinta automatiškai" value={String(branchDocuments.filter(d=>d.statusKey==="approved").length)} note="Duomenų tikslumas ≥ 97%" tone="green"/>
      <StatCard icon="shield" label="Sutaupyta šį mėnesį" value={selectedBranch==="Visi skyriai"?"18,5 val.":`${Math.max(2,branchDocuments.length*1.7).toLocaleString("lt-LT",{maximumFractionDigits:1})} val.`} note="Mažiau rankinio suvedimo" tone="amber"/>
    </div>

    <section className="panel document-process-panel">
      <div className="panel-head"><div><h2>Automatinio apdorojimo eiga</h2><p>Kiekvienas dokumentas keliauja per kontroliuojamą procesą</p></div><span className="live-process"><i/>Sistema veikia</span></div>
      <div className="document-process-strip">{[
        {icon:"inbox" as IconName,label:"Gauta",value:"12",text:"Savitarna, el. paštas, skeneris"},
        {icon:"search" as IconName,label:"Nuskaityta",value:"10",text:"Atpažinti tekstai ir datos"},
        {icon:"clock" as IconName,label:"Tikrinama",value:"4",text:"Laukia administratoriaus"},
        {icon:"check" as IconName,label:"Patvirtinta",value:"6",text:"Susieta su mokiniu"},
        {icon:"shield" as IconName,label:"Archyvuota",value:"148",text:"Saugoma mokinio byloje"},
      ].map((step,index)=><div className={`process-step ${index<2?"complete":index===2?"current":""}`} key={step.label}><span><Icon name={step.icon} size={18}/></span><div><small>{step.label}</small><strong>{step.value}</strong><p>{step.text}</p></div>{index<4&&<i className="process-connector"/>}</div>)}</div>
    </section>

    <div className="document-flow-grid">
      <section className="panel document-queue-panel">
        <div className="document-queue-head"><div><h2>Gauti dokumentai</h2><p>Automatiškai surinkti iš visų kanalų</p></div><button className="secondary-button" onClick={()=>showNotice("Dokumentų sąrašas atnaujintas")}><span>↻</span>Atnaujinti</button></div>
        <div className="document-queue-toolbar"><div className="document-status-tabs" aria-label="Dokumentų būsenos">{tabs.map((tab)=><button key={tab.key} className={status===tab.key?"active":""} onClick={()=>setStatus(tab.key)}>{tab.label}<span>{tab.count}</span></button>)}</div><div className="document-queue-filters"><label><Icon name="search" size={15}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Ieškoti mokinio ar dokumento" aria-label="Ieškoti dokumento"/></label><select value={source} onChange={(e)=>setSource(e.target.value)} aria-label="Dokumento šaltinis"><option>Visi šaltiniai</option><option>Mokinio savitarna</option><option>El. paštas</option><option>Nuskenuota filiale</option><option>Administracija</option></select></div></div>
        <div className="document-list-head"><span>DOKUMENTAS</span><span>ŠALTINIS</span><span>ATPAŽINIMAS</span><span>BŪSENA</span><span/></div>
        <div className="incoming-document-list">{filtered.map((document)=><button key={document.id} className="incoming-document-row" onClick={()=>setSelected(document)}><span className="incoming-document-main"><i><Icon name="file" size={19}/></i><span><strong>{document.type}</strong><small>{document.student} · {document.file}</small></span></span><span className="document-source"><strong>{document.source}</strong><small>{document.received}</small></span><span className="recognition-score"><i><em style={{width:`${document.confidence}%`}}/></i><strong>{document.confidence}%</strong></span><span><i className={`document-flow-status ${document.statusKey}`}>{document.status}</i></span><Icon name="chevron" size={16}/></button>)}{filtered.length===0&&<div className="documents-empty"><Icon name="inbox" size={28}/><strong>Dokumentų nerasta</strong><span>Pakeiskite filtrą arba paieškos frazę.</span></div>}</div>
        <div className="document-list-footer"><span>Rodomi {filtered.length} iš 12 šiandien gautų dokumentų</span><button onClick={()=>showNotice("Atidarytas visas dokumentų archyvas")}>Atidaryti archyvą <Icon name="arrow" size={14}/></button></div>
      </section>

      <aside className="document-side-stack">
        <section className="panel missing-documents-card"><div className="panel-head"><div><h2>Trūkstami dokumentai</h2><p>Reikalingas susisiekimas su mokiniu</p></div><span className="side-count">3</span></div><div className="missing-document-list"><div><span className="student-avatar" style={{background:"#b16a9d"}}>AV</span><span><strong>Austėja Vaitkutė</strong><small>Medicininė pažyma</small></span><button onClick={()=>showNotice("Priminimas Austėjai išsiųstas")}>Priminti</button></div><div><span className="student-avatar" style={{background:"#d6933b"}}>EK</span><span><strong>Emilija Kazlauskaitė</strong><small>Pirmosios pagalbos pažyma</small></span><button onClick={()=>showNotice("Priminimas Emilijai išsiųstas")}>Priminti</button></div><div><span className="student-avatar" style={{background:"#6575d8"}}>GJ</span><span><strong>Gabija Jankauskaitė</strong><small>Parašyta sutartis</small></span><button onClick={()=>showNotice("Priminimas Gabijai išsiųstas")}>Priminti</button></div></div><button className="remind-all-button" onClick={()=>showNotice("3 priminimai išsiųsti mokiniams")}><span>✉</span>Siųsti visus priminimus</button></section>
        <section className="panel automation-card"><div className="panel-head"><div><h2>Automatizavimo taisyklės</h2><p>Veiksmai atliekami be administratoriaus</p></div><span className="automation-active"><i/>3 aktyvios</span></div><div className="automation-list"><button onClick={()=>showNotice("Taisyklė: dokumentų susiejimas")}><span><Icon name="users" size={16}/></span><div><strong>Susieti su mokinio kortele</strong><small>Pagal asmens kodą ir el. paštą</small></div><i className="mini-toggle active"/></button><button onClick={()=>showNotice("Taisyklė: galiojimo priminimai")}><span><Icon name="bell" size={16}/></span><div><strong>Priminti apie galiojimą</strong><small>Likus 30 ir 7 dienoms</small></div><i className="mini-toggle active"/></button><button onClick={()=>showNotice("Taisyklė: dokumentų archyvavimas")}><span><Icon name="shield" size={16}/></span><div><strong>Archyvuoti patvirtinus</strong><small>Į mokinio elektroninę bylą</small></div><i className="mini-toggle active"/></button></div></section>
      </aside>
    </div>
    {selected&&<DocumentReviewDrawer document={selected} onClose={()=>setSelected(null)} showNotice={showNotice}/>}
    {uploadOpen&&<DocumentUploadModal onClose={()=>setUploadOpen(false)} onSave={()=>{setUploadOpen(false);showNotice("Dokumentas nuskaitytas ir patvirtintas")}}/>}
  </div>;
}

function DocumentReviewDrawer({ document,onClose,showNotice }: { document:(typeof incomingDocuments)[number]; onClose:()=>void; showNotice:(m:string)=>void }) {
  return <div className="drawer-layer" role="dialog" aria-modal="true" aria-label={`${document.type} peržiūra`}><button className="drawer-scrim" onClick={onClose} aria-label="Uždaryti"/><aside className="document-review-drawer"><div className="document-review-head"><button className="icon-button" onClick={onClose} aria-label="Uždaryti"><Icon name="close"/></button><span>AUTOMATINIO NUSKAITYMO REZULTATAS</span><h2>{document.type}</h2><p>{document.student} · {document.file}</p></div><div className="document-review-summary"><div className="document-preview-sheet"><span className="preview-sheet-icon"><Icon name="file" size={24}/></span><strong>{document.type}</strong><small>{document.file}</small><div>{[88,72,94,64,81,54].map((width,index)=><i key={index} style={{width:`${width}%`}}/>)}</div><em>Dokumento peržiūra</em></div><div className="recognition-overview"><span>ATPAŽINIMO TIKSLUMAS</span><strong>{document.confidence}%</strong><i><em style={{width:`${document.confidence}%`}}/></i><p>{document.note}</p><small><Icon name="clock" size={13}/> Nuskaityta per 4,2 sek.</small></div></div><div className="extracted-data-section"><div className="section-title"><div><h3>Atpažinti duomenys</h3><p>Patikrinkite prieš išsaugant mokinio kortelėje</p></div><span><Icon name="check" size={14}/> Sutampa su registracija</span></div><div className="extracted-fields"><label><span>Vardas, pavardė</span><input defaultValue={document.student}/><small className="field-confidence">99%</small></label><label><span>Asmens kodas</span><input defaultValue={document.code}/><small className="field-confidence">98%</small></label><label><span>Dokumento tipas</span><input defaultValue={document.type}/><small className="field-confidence">99%</small></label><label className={document.expiry==="Neatpažinta"?"field-warning":""}><span>Galioja iki</span><input defaultValue={document.expiry}/><small className="field-confidence">{document.expiry==="Neatpažinta"?"54%":"96%"}</small></label></div>{document.statusKey==="issue"&&<div className="document-warning"><span>!</span><div><strong>Reikalingas patikslinimas</strong><p>Galiojimo data dokumente neįskaitoma. Įveskite ją rankiniu būdu arba paprašykite geresnės kopijos.</p></div></div>}<div className="document-link-target"><span className="student-avatar" style={{background:document.color}}>{document.initials}</span><div><small>DOKUMENTAS BUS SUSIETAS SU</small><strong>{document.student} mokinio kortele</strong></div><Icon name="check" size={17}/></div></div><div className="document-review-footer"><button className="secondary-button" onClick={()=>showNotice("Dokumentas grąžintas patikslinti")}>Prašyti patikslinti</button><button className="primary-button" onClick={()=>{showNotice("Dokumentas patvirtintas ir suarchyvuotas");onClose()}}><Icon name="check" size={16}/>Patvirtinti ir archyvuoti</button></div></aside></div>;
}

function DocumentUploadModal({ onClose,onSave }: { onClose:()=>void; onSave:()=>void }) {
  const [step,setStep]=useState(1);
  const [fileReady,setFileReady]=useState(false);
  const [student,setStudent]=useState("Austėja Vaitkutė");
  const [type,setType]=useState("Medicininė pažyma");
  return <div className="modal-layer" role="dialog" aria-modal="true" aria-label="Dokumento įkėlimas"><button className="modal-scrim" onClick={onClose} aria-label="Uždaryti"/><div className="modal-card document-upload-modal"><div className="modal-head"><div><span>DOKUMENTO ĮKĖLIMAS</span><h2>{step===1?"Pridėkite dokumentą":"Patikrinkite nuskaitytus duomenis"}</h2></div><button className="icon-button" onClick={onClose} aria-label="Uždaryti"><Icon name="close"/></button></div><div className="upload-progress"><span className="active"><i>1</i>Dokumentas</span><em/><span className={step===2?"active":""}><i>2</i>Patikrinimas</span></div>{step===1?<><div className="form-grid"><label><span>Mokinys</span><select value={student} onChange={(e)=>setStudent(e.target.value)}><option>Austėja Vaitkutė</option><option>Gabija Jankauskaitė</option><option>Emilija Kazlauskaitė</option></select></label><label><span>Dokumento tipas</span><select value={type} onChange={(e)=>setType(e.target.value)}><option>Medicininė pažyma</option><option>Pirmosios pagalbos pažymėjimas</option><option>Asmens dokumento kopija</option></select></label></div><button className={`document-dropzone ${fileReady?"ready":""}`} onClick={()=>setFileReady(true)}><span><Icon name={fileReady?"check":"upload"} size={25}/></span><strong>{fileReady?"medicinine_pazyma.pdf":"Įkelkite arba pasirinkite dokumentą"}</strong><small>{fileReady?"PDF · 1,8 MB · paruošta nuskaityti":"PDF, JPG arba PNG · iki 10 MB"}</small>{!fileReady&&<em>Pasirinkti failą</em>}</button><div className="upload-info"><Icon name="shield" size={17}/><span>Dokumentas bus automatiškai nuskaitytas ir susietas su pasirinkto mokinio kortele.</span></div></>:<><div className="scan-complete-banner"><span><Icon name="check" size={18}/></span><div><strong>Dokumentas sėkmingai nuskaitytas</strong><small>Atpažinimo tikslumas 96% · užtruko 4,2 sek.</small></div></div><div className="upload-review-grid"><label><span>Vardas, pavardė <em>99%</em></span><input defaultValue={student}/></label><label><span>Dokumento tipas <em>99%</em></span><input defaultValue={type}/></label><label><span>Asmens kodas <em>98%</em></span><input defaultValue="4980312••••"/></label><label><span>Galioja iki <em>96%</em></span><input defaultValue="2028-04-18"/></label></div><div className="auto-actions-preview"><strong>Patvirtinus sistema automatiškai:</strong><span><Icon name="check" size={14}/> išsaugos dokumentą mokinio byloje;</span><span><Icon name="check" size={14}/> atnaujins dokumentų kontrolės būseną;</span><span><Icon name="check" size={14}/> sukurs galiojimo priminimą.</span></div></>}<div className="modal-actions"><button className="secondary-button" onClick={step===1?onClose:()=>setStep(1)}>{step===1?"Atšaukti":"Atgal"}</button>{step===1?<button className="primary-button" disabled={!fileReady} onClick={()=>setStep(2)}><Icon name="search" size={16}/>Nuskaityti dokumentą</button>:<button className="primary-button" onClick={onSave}><Icon name="check" size={16}/>Patvirtinti ir išsaugoti</button>}</div></div></div>;
}

function CalendarModule({ onBack, showNotice, selectedBranch }: { onBack:()=>void; showNotice:(m:string)=>void; selectedBranch:string }) {
  const [view, setView] = useState<"week"|"day">("week");
  const [instructor, setInstructor] = useState("Visi instruktoriai");
  const [vehicle, setVehicle] = useState("Visi automobiliai");
  const [category, setCategory] = useState("Visos kategorijos");
  const [selectedEvent, setSelectedEvent] = useState<(typeof calendarEvents)[number] | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const branchSummary=branchOptions.find((branch)=>branch.value===selectedBranch)??branchOptions[0];
  const weeklyLessons=selectedBranch==="Visi skyriai"?48:Math.max(4,Math.round(branchSummary.lessons/18*48));
  const days = [{name:"Pirmadienis",short:"Pr",date:20},{name:"Antradienis",short:"An",date:21},{name:"Trečiadienis",short:"Tr",date:22},{name:"Ketvirtadienis",short:"Kt",date:23},{name:"Penktadienis",short:"Pn",date:24}];
  const times = ["08:00","09:30","11:00","12:30","14:00","15:30","17:00"];
  const filteredEvents = calendarEvents.filter((event)=>
    (selectedBranch==="Visi skyriai"||event.branch===selectedBranch)&&
    (instructor==="Visi instruktoriai"||event.instructor===instructor)&&
    (vehicle==="Visi automobiliai"||event.vehicle.startsWith(vehicle))&&
    (category==="Visos kategorijos"||event.category===category)
  );
  const displayedDays = view==="week"?days:[days[0]];

  return <div className="calendar-page">
    <button className="back-link" onClick={onBack}>← Grįžti į apžvalgą</button>
    <PageHeading eyebrow="VAŽIAVIMŲ PLANAVIMAS" title="Kalendorius" text="Instruktorių, mokinių ir transporto grafikai vienoje vietoje." action={<button className="primary-button standalone" onClick={()=>setCreateOpen(true)}><Icon name="plus" size={18}/>Naujas važiavimas</button>}/>

    <div className="calendar-summary-cards">
      <div><span className="summary-icon red"><Icon name="calendar"/></span><span><small>Šią savaitę</small><strong>{weeklyLessons} važiavimai</strong><em>{weeklyLessons*1.5} mokymo val.</em></span></div>
      <div><span className="summary-icon green"><Icon name="clock"/></span><span><small>Laisvi laikai</small><strong>{Math.max(3,Math.round(weeklyLessons*.35))} intervalų</strong><em>Pas pasirinktus instruktorius</em></span></div>
      <div><span className="summary-icon amber"><Icon name="bell"/></span><span><small>Laukia patvirtinimo</small><strong>{filteredEvents.filter(e=>e.statusKey==="pending").length} važiavimai</strong><em>Reikia priminti</em></span></div>
      <div><span className="summary-icon purple"><Icon name="shield"/></span><span><small>Planavimo konfliktai</small><strong>{filteredEvents.filter(e=>e.statusKey==="conflict").length} konfliktas</strong><em>Reikia išspręsti</em></span></div>
    </div>

    <div className="calendar-layout">
      <section className="panel calendar-panel">
        <div className="calendar-toolbar-main">
          <div className="calendar-date-navigation"><button onClick={()=>setWeekOffset(weekOffset-1)} aria-label="Ankstesnė savaitė">‹</button><button onClick={()=>setWeekOffset(0)}>Šiandien</button><button onClick={()=>setWeekOffset(weekOffset+1)} aria-label="Kita savaitė">›</button><strong>{weekOffset===0?"2026 m. liepos 20–24 d.":weekOffset<0?"2026 m. liepos 13–17 d.":"2026 m. liepos 27–31 d."}</strong></div>
          <div className="calendar-view-toggle"><button className={view==="day"?"active":""} onClick={()=>setView("day")}>Diena</button><button className={view==="week"?"active":""} onClick={()=>setView("week")}>Savaitė</button></div>
        </div>
        <div className="calendar-filter-row">
          <label><Icon name="users" size={15}/><select value={instructor} onChange={(e)=>setInstructor(e.target.value)} aria-label="Filtruoti pagal instruktorių"><option>Visi instruktoriai</option><option>Darius Siudikas</option><option>Vesta Jankauskienė</option><option>Tomas Noreika</option></select></label>
          <label><Icon name="car" size={15}/><select value={vehicle} onChange={(e)=>setVehicle(e.target.value)} aria-label="Filtruoti pagal automobilį"><option>Visi automobiliai</option><option>Toyota Corolla</option><option>Toyota Yaris</option><option>Volkswagen Golf</option><option>MAN TGL</option><option>Honda CB500F</option></select></label>
          <label><Icon name="filter" size={15}/><select value={category} onChange={(e)=>setCategory(e.target.value)} aria-label="Filtruoti pagal kategoriją"><option>Visos kategorijos</option><option>B</option><option>A2</option><option>C</option></select></label>
          <button className="auto-find-button" onClick={()=>showNotice("Rasti 7 tinkami laikai pagal mokinio ir instruktoriaus užimtumą")}><span>✦</span>Rasti laisvą laiką</button>
        </div>

        <div className={`week-calendar ${view==="day"?"day-calendar":""}`}>
          <div className="calendar-corner"><span>GMT+3</span></div>
          {displayedDays.map((day,index)=><div className={`calendar-day-head ${day.date===20?"today":""}`} key={day.date}><span>{day.name}</span><strong>{day.date}</strong><small>{filteredEvents.filter((event)=>event.day===index).length} važiav.</small></div>)}
          {times.map((time,rowIndex)=><div className="calendar-row-fragment" key={time} style={{display:"contents"}}><div className="calendar-time-label"><span>{time}</span>{rowIndex<times.length-1&&<small>{times[rowIndex+1]}</small>}</div>{displayedDays.map((day,dayIndex)=>{
            const event=filteredEvents.find((item)=>item.day===dayIndex&&item.time===time);
            const isLunch=time==="12:30";
            return <div className={`calendar-slot ${isLunch?"lunch-slot":""}`} key={`${day.date}-${time}`}>
              {isLunch&&!event&&<span className="lunch-label">Pietų pertrauka</span>}
              {event&&<button className={`calendar-event ${event.tone} ${event.statusKey}`} onClick={()=>setSelectedEvent(event)}><span className="event-time">{event.time}–{event.end}</span><strong>{event.student}</strong><small>{event.category} · {event.instructor}</small><em><Icon name="car" size={12}/>{event.vehicle.split(" · ")[0]}</em>{event.statusKey==="pending"&&<i>Laukia</i>}{event.statusKey==="conflict"&&<i>⚠ Konfliktas</i>}</button>}
              {!event&&!isLunch&&<button className="empty-slot-add" onClick={()=>setCreateOpen(true)} aria-label={`Pridėti važiavimą ${day.name} ${time}`}>+</button>}
            </div>})}</div>)}
        </div>
        <div className="calendar-legend"><span><i className="red"/>Darius Siudikas</span><span><i className="blue"/>Vesta Jankauskienė</span><span><i className="green"/>Tomas Noreika</span><span><i className="outline"/>Laukia patvirtinimo</span></div>
      </section>

      <aside className="calendar-sidebar">
        <section className="panel attention-panel"><div className="panel-head"><div><h2>Reikia dėmesio</h2><p>Planavimo išimtys</p></div><i className="attention-count">4</i></div><div className="attention-list"><button onClick={()=>setSelectedEvent(calendarEvents[4])}><span className="attention-symbol conflict">!</span><div><strong>Planavimo konfliktas</strong><small>Austėja Vaitkutė · An, 14:00</small><p>Automobilis rezervuotas kitame filiale</p></div><Icon name="chevron" size={15}/></button><button onClick={()=>setSelectedEvent(calendarEvents[1])}><span className="attention-symbol pending"><Icon name="clock" size={15}/></span><div><strong>Laukia patvirtinimo</strong><small>Gabija Jankauskaitė · Pr, 11:00</small><p>Priminimas dar neišsiųstas</p></div><Icon name="chevron" size={15}/></button></div><button className="attention-action" onClick={()=>showNotice("Priminimai išsiųsti 3 mokiniams")}>Siųsti visus priminimus</button></section>
        <section className="panel free-times-panel"><div className="panel-head"><div><h2>Artimiausi laisvi laikai</h2><p>Automatiškai rasti intervalai</p></div></div><div className="free-time-list"><button onClick={()=>setCreateOpen(true)}><span><strong>Šiandien, 14:00</strong><small>Darius · Toyota Corolla</small></span><em>1,5 val.</em></button><button onClick={()=>setCreateOpen(true)}><span><strong>Antradienį, 11:00</strong><small>Vesta · Toyota Yaris</small></span><em>1,5 val.</em></button><button onClick={()=>setCreateOpen(true)}><span><strong>Trečiadienį, 14:00</strong><small>Tomas · MAN TGL</small></span><em>1,5 val.</em></button></div><button className="free-times-action" onClick={()=>showNotice("Parodyti visi 17 laisvų intervalų")}>Rodyti visus laikus <Icon name="arrow" size={15}/></button></section>
      </aside>
    </div>
    {selectedEvent&&<LessonDrawer event={selectedEvent} onClose={()=>setSelectedEvent(null)} showNotice={showNotice}/>}
    {createOpen&&<CalendarLessonModal onClose={()=>setCreateOpen(false)} onSave={()=>{setCreateOpen(false);showNotice("Važiavimas sėkmingai suplanuotas")}}/>}
  </div>;
}

function LessonDrawer({ event, onClose, showNotice }: { event:(typeof calendarEvents)[number]; onClose:()=>void; showNotice:(m:string)=>void }) {
  const [tab,setTab]=useState("details");
  return <div className="drawer-layer" role="dialog" aria-modal="true" aria-label={`${event.student} važiavimo kortelė`}><button className="drawer-scrim" onClick={onClose} aria-label="Uždaryti"/><aside className="lesson-drawer"><div className="lesson-drawer-head"><button className="icon-button" onClick={onClose} aria-label="Uždaryti"><Icon name="close"/></button><span>VAŽIAVIMO KORTELĖ</span><h2>{event.student}</h2><p>2026 m. liepos {20+event.day} d. · {event.time}–{event.end}</p><i className={`lesson-status ${event.statusKey}`}>{event.status}</i></div><div className="lesson-drawer-tabs"><button className={tab==="details"?"active":""} onClick={()=>setTab("details")}>Informacija</button><button className={tab==="confirmations"?"active":""} onClick={()=>setTab("confirmations")}>Patvirtinimai</button><button className={tab==="notes"?"active":""} onClick={()=>setTab("notes")}>Pamokos įrašas</button></div>{tab==="details"&&<div className="lesson-drawer-content"><div className="lesson-main-card"><span className="student-card-avatar" style={{background:event.tone==="red"?"#e73f49":event.tone==="blue"?"#6575d8":event.tone==="green"?"#239574":"#d28a2f"}}>{event.initials}</span><div><span>{event.lesson}</span><strong>{event.student}</strong><small>{event.category} kategorija</small></div><button onClick={()=>showNotice("Mokinio kortelė atidaryta")}><Icon name="chevron" size={16}/></button></div><h3>Priskyrimai</h3><div className="lesson-assignment-list"><div><span className="assignment-icon"><Icon name="users" size={17}/></span><div><small>Instruktorius</small><strong>{event.instructor}</strong></div><button onClick={()=>showNotice("Instruktoriaus keitimas atidarytas")}>Keisti</button></div><div><span className="assignment-icon"><Icon name="car" size={17}/></span><div><small>Transporto priemonė</small><strong>{event.vehicle}</strong></div><button onClick={()=>showNotice("Automobilio keitimas atidarytas")}>Keisti</button></div><div><span className="assignment-icon"><Icon name="map" size={17}/></span><div><small>Susitikimo vieta</small><strong>{event.branch}</strong></div><button onClick={()=>showNotice("Vieta parodyta žemėlapyje")}>Žemėlapis</button></div></div>{event.statusKey==="conflict"&&<div className="conflict-warning"><span>!</span><div><strong>Rastas planavimo konfliktas</strong><p>{event.note}. Pasirinkite kitą automobilį arba laiką.</p></div></div>}<h3>Pamokos planas</h3><div className="lesson-plan-box"><Icon name="book" size={18}/><span>{event.note}</span></div></div>}{tab==="confirmations"&&<div className="lesson-drawer-content"><div className="confirmation-row"><span className="student-card-avatar" style={{background:"#e73f49"}}>{event.initials}</span><div><small>Mokinys</small><strong>{event.student}</strong><p>{event.statusKey==="pending"?"Priminimas išsiųstas prieš 2 val.":"Patvirtino 2026-07-19, 18:42"}</p></div><i className={`confirmation-state ${event.statusKey==="pending"?"waiting":"done"}`}>{event.statusKey==="pending"?"Laukiama":"Patvirtinta"}</i></div><div className="confirmation-row"><span className="student-card-avatar instructor-avatar">IN</span><div><small>Instruktorius</small><strong>{event.instructor}</strong><p>Patvirtino 2026-07-19, 16:10</p></div><i className="confirmation-state done">Patvirtinta</i></div><button className="primary-button drawer-full-button" onClick={()=>showNotice("Priminimas išsiųstas mokiniui")}><Icon name="bell" size={16}/>Siųsti priminimą</button></div>}{tab==="notes"&&<div className="lesson-drawer-content"><label className="lesson-notes-field"><span>Pamokos rezultatas ir instruktoriaus pastabos</span><textarea placeholder="Įrašykite, kaip sekėsi mokiniui..." defaultValue={event.statusKey==="confirmed"?"Mokinys gerai valdo automobilį. Kitą pamoką daugiau dėmesio skirsime sudėtingoms sankryžoms.":""}/></label><div className="lesson-rating"><span>Pamokos įvertinimas</span><div>{[1,2,3,4,5].map((n)=><button key={n} onClick={()=>showNotice(`Pasirinktas įvertinimas: ${n}`)}>★</button>)}</div></div><button className="primary-button drawer-full-button" onClick={()=>showNotice("Pamokos įrašas išsaugotas")}>Išsaugoti pamokos įrašą</button></div>}<div className="lesson-drawer-footer"><button className="secondary-button" onClick={()=>showNotice("Važiavimo perkėlimas atidarytas")}>Perkelti</button><button className="secondary-button danger-button" onClick={()=>showNotice("Atšaukimo patvirtinimas atidarytas")}>Atšaukti</button><button className="primary-button" onClick={()=>showNotice("Važiavimas pažymėtas užbaigtu")}>Užbaigti</button></div></aside></div>;
}

function CalendarLessonModal({ onClose,onSave }: { onClose:()=>void; onSave:()=>void }) {
  const [step,setStep]=useState(1);
  const [time,setTime]=useState("14:00–15:30");
  return <div className="modal-layer" role="dialog" aria-modal="true" aria-label="Naujo važiavimo planavimas"><button className="modal-scrim" onClick={onClose} aria-label="Uždaryti"/><div className="modal-card calendar-modal"><div className="modal-head"><div><span>NAUJAS VAŽIAVIMAS</span><h2>Suplanuoti pamoką</h2></div><button className="icon-button" onClick={onClose} aria-label="Uždaryti"><Icon name="close"/></button></div><div className="steps"><i className="active">1</i><span/><i className={step>=2?"active":""}>2</i><span/><i className={step>=3?"active":""}>3</i></div>{step===1&&<div><div className="form-grid"><label className="wide"><span>Mokinys</span><select><option>Lukas Petrauskas · B kategorija</option><option>Gabija Jankauskaitė · B automatas</option><option>Emilija Kazlauskaitė · A2</option></select></label><label><span>Data</span><input type="date" defaultValue="2026-07-21"/></label><label><span>Laikas</span><select value={time} onChange={(e)=>setTime(e.target.value)}><option>09:30–11:00</option><option>11:00–12:30</option><option>14:00–15:30</option><option>15:30–17:00</option></select></label></div><div className="suggested-times"><div><span>✦</span><div><strong>Automatiškai rasti tinkami laikai</strong><small>Pagal mokinio, instruktoriaus ir automobilio užimtumą</small></div></div><div className="suggested-time-buttons"><button className={time==="14:00–15:30"?"active":""} onClick={()=>setTime("14:00–15:30")}><strong>14:00</strong><small>Šiandien</small></button><button className={time==="09:30–11:00"?"active":""} onClick={()=>setTime("09:30–11:00")}><strong>09:30</strong><small>Antradienį</small></button><button className={time==="11:00–12:30"?"active":""} onClick={()=>setTime("11:00–12:30")}><strong>11:00</strong><small>Trečiadienį</small></button></div></div></div>}{step===2&&<div><div className="form-grid"><label className="wide"><span>Instruktorius</span><select><option>Darius Siudikas · laisvas</option><option>Vesta Jankauskienė · laisva nuo 15:30</option></select></label><label className="wide"><span>Transporto priemonė</span><select><option>Toyota Corolla · JTD 248 · laisva</option><option>Volkswagen Golf · MOK 517 · laisva</option></select></label><label className="wide"><span>Susitikimo vieta</span><select><option>Centro skyrius</option><option>Šiaurės skyrius</option></select></label></div><div className="availability"><span><Icon name="check" size={16}/></span><div><strong>Konfliktų nerasta</strong><p>Mokinys, instruktorius ir automobilis pasirinktu metu yra laisvi.</p></div></div></div>}{step===3&&<div className="booking-review"><div className="review-icon"><Icon name="calendar" size={26}/></div><h3>Patikrinkite važiavimo informaciją</h3><div><span>Mokinys</span><strong>Lukas Petrauskas</strong></div><div><span>Data ir laikas</span><strong>2026-07-21 · {time}</strong></div><div><span>Instruktorius</span><strong>Darius Siudikas</strong></div><div><span>Automobilis</span><strong>Toyota Corolla · JTD 248</strong></div><label><input type="checkbox" defaultChecked/>Išsiųsti patvirtinimą mokiniui ir instruktoriui</label></div>}<div className="modal-actions"><button className="secondary-button" onClick={step===1?onClose:()=>setStep(step-1)}>{step===1?"Atšaukti":"Atgal"}</button>{step<3?<button className="primary-button" onClick={()=>setStep(step+1)}>Toliau <Icon name="arrow" size={16}/></button>:<button className="primary-button" onClick={onSave}><Icon name="check" size={16}/>Suplanuoti važiavimą</button>}</div></div></div>;
}

function StudentsModule({ onBack, onAdd, showNotice, selectedBranch }: { onBack:()=>void; onAdd:()=>void; showNotice:(m:string)=>void; selectedBranch:string }) {
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("Visos kategorijos");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"cards"|"list">("cards");
  const [selected, setSelected] = useState<(typeof students)[number] | null>(null);
  const branchSummary=branchOptions.find((branch)=>branch.value===selectedBranch)??branchOptions[0];
  const totalStudents=branchSummary.students;
  const newStudents=selectedBranch==="Visi skyriai"?12:Math.max(2,Math.round(totalStudents/21));
  const finishingStudents=selectedBranch==="Visi skyriai"?7:Math.max(1,Math.round(totalStudents/35));
  const attentionStudents=selectedBranch==="Visi skyriai"?3:Math.max(1,Math.round(totalStudents/83));
  const activeStudents=Math.max(0,totalStudents-newStudents-finishingStudents-attentionStudents);

  const filtered = students.filter((student) => {
    const matchesBranch = selectedBranch === "Visi skyriai" || student.branch === selectedBranch;
    const matchesStatus = status === "all" || student.statusKey === status;
    const matchesCategory = category === "Visos kategorijos" || student.category === category;
    const haystack = `${student.name} ${student.email} ${student.phone} ${student.instructor}`.toLowerCase();
    return matchesBranch && matchesStatus && matchesCategory && haystack.includes(query.toLowerCase());
  });

  return <div className="students-page">
    <button className="back-link" onClick={onBack}>← Grįžti į apžvalgą</button>
    <PageHeading eyebrow="MOKINIŲ VALDYMAS" title="Mokiniai" text="Mokymosi progresas, sutartys, mokėjimai ir visa komunikacijos istorija." action={<button className="primary-button standalone" onClick={onAdd}><Icon name="plus" size={18}/>Registruoti mokinį</button>}/>

    <div className="students-stats">
      <StatCard icon="users" label="Aktyvūs mokiniai" value={String(totalStudents)} note={selectedBranch==="Visi skyriai"?"↑ 12 šį mėnesį":branchSummary.label} tone="red"/>
      <StatCard icon="plus" label="Naujos registracijos" value={String(newStudents)} note="Per paskutines 30 d." tone="blue"/>
      <StatCard icon="check" label="Baigia mokymus" value={String(finishingStudents)} note="Pasiruošę egzaminui" tone="green"/>
      <StatCard icon="file" label="Reikia dėmesio" value={String(attentionStudents)} note="Dokumentai ar mokėjimai" tone="amber"/>
    </div>

    <section className="panel students-panel">
      <div className="students-toolbar">
        <div className="student-status-tabs" aria-label="Mokinių būsenos">
          {[{key:"all",label:"Visi",count:totalStudents},{key:"active",label:"Aktyvūs",count:activeStudents},{key:"new",label:"Nauji",count:newStudents},{key:"finishing",label:"Baigia",count:finishingStudents},{key:"attention",label:"Reikia dėmesio",count:attentionStudents}].map((tab)=><button key={tab.key} className={status===tab.key?"active":""} onClick={()=>setStatus(tab.key)}>{tab.label}<span>{tab.count}</span></button>)}
        </div>
        <div className="student-tools">
          <label className="student-module-search"><Icon name="search" size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Vardas, telefonas ar instruktorius" aria-label="Ieškoti mokinio"/></label>
          <label className="student-category"><Icon name="filter" size={15}/><select value={category} onChange={(e)=>setCategory(e.target.value)} aria-label="Mokymų kategorija"><option>Visos kategorijos</option><option>B</option><option>A2</option><option>C</option></select></label>
          <div className="view-toggle"><button className={view==="cards"?"active":""} onClick={()=>setView("cards")} aria-label="Kortelių vaizdas">▦</button><button className={view==="list"?"active":""} onClick={()=>setView("list")} aria-label="Sąrašo vaizdas">☷</button></div>
        </div>
      </div>

      <div className={`student-cards-grid ${view==="list"?"student-list-view":""}`}>
        {filtered.map((student)=><button className="student-profile-card" key={student.id} onClick={()=>setSelected(student)}>
          <span className="student-card-top"><i className="student-card-avatar" style={{background:`linear-gradient(145deg,${student.color},${student.color}c9)`}}>{student.initials}</i><span><strong>{student.name}</strong><small>{student.email}</small></span><i className={`student-card-status ${student.statusKey}`}>{student.status}</i></span>
          <span className="student-course-row"><span><small>MOKYMAI</small><strong>{student.course}</strong><em>{student.gearbox}</em></span><span><small>INSTRUKTORIUS</small><strong>{student.instructor}</strong><em>{student.branch}</em></span></span>
          <span className="student-card-progress"><span><small>Praktinio vairavimo progresas</small><strong>{student.hours}</strong></span><i><em style={{width:`${student.progress}%`,background:student.color}}/></i></span>
          <span className="student-card-bottom"><span><Icon name="calendar" size={14}/><span><small>Kitas važiavimas</small><strong>{student.nextLesson}</strong></span></span><i><Icon name="chevron" size={17}/></i></span>
        </button>)}
        {filtered.length===0&&<div className="students-empty"><Icon name="users" size={30}/><strong>Mokinių nerasta</strong><span>Pakeiskite paiešką arba filtrus.</span></div>}
      </div>
      <div className="students-footer"><span>Rodomi {filtered.length} iš {totalStudents} mokinių</span><div><button disabled>‹</button><button className="active">1</button><button>2</button><button>3</button><button>…</button><button>25</button><button>›</button></div></div>
    </section>
    {selected&&<StudentDrawer student={selected} onClose={()=>setSelected(null)} showNotice={showNotice}/>}
  </div>;
}

function StudentDrawer({ student, onClose, showNotice }: { student:(typeof students)[number]; onClose:()=>void; showNotice:(m:string)=>void }) {
  const [tab, setTab] = useState("overview");
  const balance = student.price-student.paid;
  return <div className="drawer-layer" role="dialog" aria-modal="true" aria-label={`${student.name} mokinio kortelė`}><button className="drawer-scrim" onClick={onClose} aria-label="Uždaryti"/><aside className="student-drawer"><div className="student-drawer-head"><button className="icon-button student-drawer-close" onClick={onClose} aria-label="Uždaryti"><Icon name="close"/></button><div className="student-identity"><i style={{background:`linear-gradient(145deg,${student.color},${student.color}c9)`}}>{student.initials}</i><div><span>MOKINIO KORTELĖ</span><h2>{student.name}</h2><p>{student.course} · nuo {student.start}</p></div></div><i className={`student-card-status ${student.statusKey}`}>{student.status}</i></div><div className="student-drawer-actions"><button onClick={()=>showNotice("Žinutės langas atidarytas")}><span>✉</span>Rašyti</button><button onClick={()=>showNotice("Skambučio duomenys parodyti")}><span>☎</span>Skambinti</button><button onClick={()=>showNotice("Važiavimo planavimas atidarytas")}><Icon name="calendar" size={16}/>Planuoti</button></div><div className="drawer-tabs student-tabs"><button className={tab==="overview"?"active":""} onClick={()=>setTab("overview")}>Apžvalga</button><button className={tab==="training"?"active":""} onClick={()=>setTab("training")}>Mokymai</button><button className={tab==="finance"?"active":""} onClick={()=>setTab("finance")}>Finansai</button><button className={tab==="documents"?"active":""} onClick={()=>setTab("documents")}>Dokumentai</button></div>
    {tab==="overview"&&<div className="student-drawer-content"><h3>Kontaktinė informacija</h3><div className="student-contact-grid"><div><span>El. paštas</span><strong>{student.email}</strong></div><div><span>Telefonas</span><strong>{student.phone}</strong></div><div><span>Filialas</span><strong>{student.branch}</strong></div><div><span>Sutartis</span><strong>{student.contract}</strong></div></div><h3>Priskyrimas</h3><div className="student-assignment"><span className="student-avatar" style={{background:student.color}}>IN</span><div><span>Vairavimo instruktorius</span><strong>{student.instructor}</strong><small>{student.course} · {student.gearbox}</small></div><button onClick={()=>showNotice("Instruktoriaus keitimas atidarytas")}>Keisti</button></div><h3>Artimiausi veiksmai</h3><div className="next-actions-list"><div><span className="action-icon red"><Icon name="calendar" size={17}/></span><div><strong>Kitas važiavimas</strong><small>{student.nextLesson}</small></div><button onClick={()=>showNotice("Važiavimo informacija atidaryta")}><Icon name="chevron" size={15}/></button></div><div><span className="action-icon blue"><Icon name="book" size={17}/></span><div><strong>„Regitra“ egzaminas</strong><small>{student.exam}</small></div><button onClick={()=>showNotice("Egzamino registracija atidaryta")}><Icon name="chevron" size={15}/></button></div></div></div>}
    {tab==="training"&&<div className="student-drawer-content"><div className="training-progress-grid"><div><div className="small-progress-ring" style={{"--value":`${student.theory}%`,"--ring":student.color} as React.CSSProperties}><strong>{student.theory}%</strong></div><span>Teorijos progresas</span><small>KET temos ir testai</small></div><div><div className="small-progress-ring" style={{"--value":`${student.progress}%`,"--ring":student.color} as React.CSSProperties}><strong>{student.progress}%</strong></div><span>Praktinis vairavimas</span><small>{student.hours}</small></div></div><div className="skills-card"><div><span>Sankryžos ir žiedai</span><i><em style={{width:"84%",background:student.color}}/></i><strong>4,6</strong></div><div><span>Parkavimas</span><i><em style={{width:"72%",background:student.color}}/></i><strong>4,1</strong></div><div><span>Važiavimas mieste</span><i><em style={{width:"90%",background:student.color}}/></i><strong>4,8</strong></div></div><h3>Paskutinės pamokos</h3><div className="lesson-history"><div><i/><span><strong>19 pamoka · Miesto maršrutai</strong><small>2026-07-18 · 1,5 val. · Įvertinimas 4,8</small><p>Gerai valdo automobilį, dar reikia daugiau dėmesio persirikiuojant.</p></span></div><div><i/><span><strong>18 pamoka · Parkavimas</strong><small>2026-07-15 · 1,5 val. · Įvertinimas 4,6</small><p>Lygiagretus parkavimas atliktas savarankiškai.</p></span></div></div><button className="secondary-button drawer-full-button" onClick={()=>showNotice("Pridėtas pamokos įvertinimas")}>Pridėti pamokos įvertinimą</button></div>}
    {tab==="finance"&&<div className="student-drawer-content"><div className="finance-summary"><div><span>Kurso kaina</span><strong>{student.price} €</strong></div><div><span>Apmokėta</span><strong className="green-text">{student.paid} €</strong></div><div><span>Likutis</span><strong className={balance>0?"amber-text":"green-text"}>{balance} €</strong></div></div><div className="finance-progress"><span><small>Apmokėta</small><strong>{Math.round(student.paid/student.price*100)}%</strong></span><i><em style={{width:`${student.paid/student.price*100}%`}}/></i></div><h3>Mokėjimų istorija</h3><div className="payment-list"><div><span><Icon name="card" size={18}/></span><div><strong>Pradinis mokėjimas</strong><small>2026-06-03 · Banko pavedimas</small></div><em>+{Math.min(200,student.paid)} €</em></div>{student.paid>200&&<div><span><Icon name="card" size={18}/></span><div><strong>Antras mokėjimas</strong><small>2026-07-01 · Banko kortelė</small></div><em>+{student.paid-200} €</em></div>}</div><button className="primary-button drawer-full-button" onClick={()=>showNotice("Mokėjimo registravimo forma atidaryta")}><Icon name="plus" size={16}/>Registruoti mokėjimą</button></div>}
    {tab==="documents"&&<div className="student-drawer-content"><div className="student-document-list"><div><span><Icon name="file" size={19}/></span><div><strong>Mokymo sutartis</strong><small>{student.contract} · Pasirašyta {student.start}</small></div><i className="status-chip available">Pasirašyta</i><button onClick={()=>showNotice("Sutartis atidaryta")}><Icon name="chevron" size={15}/></button></div><div><span><Icon name="shield" size={19}/></span><div><strong>Medicininė pažyma</strong><small>Galioja iki 2028-04-18</small></div><i className={`status-chip ${student.statusKey==="attention"?"attention":"available"}`}>{student.statusKey==="attention"?"Trūksta":"Galioja"}</i><button onClick={()=>showNotice("Dokumento informacija atidaryta")}><Icon name="chevron" size={15}/></button></div><div><span><Icon name="book" size={19}/></span><div><strong>Pirmosios pagalbos pažymėjimas</strong><small>Įkeltas 2026-06-02</small></div><i className="status-chip available">Gauta</i><button onClick={()=>showNotice("Dokumento informacija atidaryta")}><Icon name="chevron" size={15}/></button></div></div><button className="secondary-button drawer-full-button" onClick={()=>showNotice("Dokumento įkėlimo langas atidarytas")}><Icon name="plus" size={16}/>Pridėti dokumentą</button></div>}
    <div className="drawer-footer"><button className="secondary-button" onClick={()=>showNotice("Mokinio duomenys redaguojami")}>Redaguoti</button><button className="primary-button" onClick={()=>showNotice("Mokinio būsena pakeista")}>Keisti būseną</button></div></aside></div>;
}

function TransportModule({ onBack, showNotice, selectedBranch }: { onBack:()=>void; showNotice:(m:string)=>void; selectedBranch:string }) {
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("Visos kategorijos");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof vehicles)[number] | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const branchFleet=vehicles.filter((vehicle)=>selectedBranch==="Visi skyriai"||vehicle.branch===selectedBranch);
  const fleetTotal=selectedBranch==="Visi skyriai"?18:branchFleet.length;

  const filtered = vehicles.filter((vehicle) => {
    const matchesBranch = selectedBranch === "Visi skyriai" || vehicle.branch === selectedBranch;
    const matchesStatus = status === "all" || vehicle.statusKey === status;
    const matchesCategory = category === "Visos kategorijos" || vehicle.category === category;
    const haystack = `${vehicle.make} ${vehicle.plate} ${vehicle.instructor}`.toLowerCase();
    return matchesBranch && matchesStatus && matchesCategory && haystack.includes(query.toLowerCase());
  });

  return <div className="transport-page">
    <button className="back-link" onClick={onBack}>← Grįžti į apžvalgą</button>
    <PageHeading eyebrow="TRANSPORTO PARKAS" title="Transporto priemonės" text="Automobilių būklė, dokumentai, priskyrimai ir techninė priežiūra vienoje vietoje." action={<button className="primary-button standalone" onClick={()=>setAddOpen(true)}><Icon name="plus" size={18}/>Pridėti transporto priemonę</button>}/>

    <div className="transport-stats">
      <StatCard icon="car" label="Visas parkas" value={String(fleetTotal)} note={selectedBranch==="Visi skyriai"?"5 rodomos prototipe":"Pasirinktame skyriuje"} tone="red"/>
      <StatCard icon="check" label="Šiandien laisvos" value={String(selectedBranch==="Visi skyriai"?4:branchFleet.filter(v=>v.statusKey==="available").length)} note="Galima rezervuoti" tone="green"/>
      <StatCard icon="wrench" label="Servise" value={String(selectedBranch==="Visi skyriai"?2:branchFleet.filter(v=>v.statusKey==="service").length)} note="Pagal pasirinktą skyrių" tone="blue"/>
      <StatCard icon="shield" label="Reikia dėmesio" value={String(selectedBranch==="Visi skyriai"?3:branchFleet.filter(v=>v.statusKey==="attention").length)} note="TA arba priežiūra" tone="amber"/>
    </div>

    <section className="panel fleet-panel">
      <div className="fleet-toolbar">
        <div className="fleet-tabs" aria-label="Transporto būsenos">
          {[{key:"all",label:"Visos",count:fleetTotal},{key:"active",label:"Eksploatuojamos",count:selectedBranch==="Visi skyriai"?12:branchFleet.filter(v=>v.statusKey==="active").length},{key:"available",label:"Laisvos",count:selectedBranch==="Visi skyriai"?4:branchFleet.filter(v=>v.statusKey==="available").length},{key:"service",label:"Servise",count:selectedBranch==="Visi skyriai"?2:branchFleet.filter(v=>v.statusKey==="service").length}].map((tab)=><button key={tab.key} className={status===tab.key?"active":""} onClick={()=>setStatus(tab.key)}>{tab.label}<span>{tab.count}</span></button>)}
        </div>
        <div className="fleet-filters">
          <label className="fleet-search"><Icon name="search" size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Automobilis, nr. ar instruktorius" aria-label="Ieškoti transporto"/></label>
          <label className="category-filter"><Icon name="filter" size={15}/><select value={category} onChange={(e)=>setCategory(e.target.value)} aria-label="Kategorija"><option>Visos kategorijos</option><option>B</option><option>C</option></select></label>
        </div>
      </div>

      <div className="fleet-table-head"><span>TRANSPORTO PRIEMONĖ</span><span>INSTRUKTORIUS / FILIALAS</span><span>RIDA</span><span>KITA PRIEŽIŪRA</span><span>BŪSENA</span><span/></div>
      <div className="fleet-list">
        {filtered.map((vehicle)=><button className="vehicle-row" key={vehicle.id} onClick={()=>setSelected(vehicle)}>
          <span className="vehicle-cell"><i className="vehicle-visual" style={{background:`${vehicle.color}18`,color:vehicle.color}}><Icon name="car" size={25}/></i><span><strong>{vehicle.make}</strong><small>{vehicle.plate} · {vehicle.year} · {vehicle.gearbox}</small><em>{vehicle.category} kategorija</em></span></span>
          <span className="vehicle-person"><strong>{vehicle.instructor}</strong><small><Icon name="map" size={12}/>{vehicle.branch}</small></span>
          <span className="vehicle-mileage"><strong>{vehicle.mileage}</strong><small>Atnaujinta šiandien</small></span>
          <span className={`vehicle-service ${vehicle.statusKey==="attention"?"urgent":""}`}><strong>{vehicle.service}</strong><small>{vehicle.statusKey==="attention"?"Suplanuoti servisą":"Pagal ridą"}</small></span>
          <span><i className={`status-chip ${vehicle.statusKey}`}>{vehicle.status}</i></span>
          <span className="row-arrow"><Icon name="chevron" size={17}/></span>
        </button>)}
        {filtered.length===0 && <div className="fleet-empty"><Icon name="car" size={28}/><strong>Transporto nerasta</strong><span>Pakeiskite paiešką arba filtrus.</span></div>}
      </div>
    </section>

    <div className="transport-bottom-grid">
      <section className="panel maintenance-card"><div className="panel-head"><div><h2>Artėjanti techninė priežiūra</h2><p>Pagal ridą ir dokumentų galiojimą</p></div><button onClick={()=>showNotice("Atidarytas priežiūros planas")}>Visas planas <Icon name="arrow" size={16}/></button></div><div className="maintenance-list"><button onClick={()=>setSelected(vehicles[2])}><span className="maintenance-icon urgent"><Icon name="wrench" size={18}/></span><div><strong>Škoda Octavia · DEM 032</strong><small>Alyvos ir filtrų keitimas po 480 km</small></div><em>Skubu</em></button><button onClick={()=>setSelected(vehicles[0])}><span className="maintenance-icon"><Icon name="shield" size={18}/></span><div><strong>Toyota Corolla · JTD 248</strong><small>Draudimas galioja iki 2026-11-30</small></div><em>Po 4 mėn.</em></button></div></section>
      <section className="panel utilization-card"><div className="panel-head"><div><h2>Parko užimtumas</h2><p>Šios savaitės rezervacijos</p></div></div><div className="utilization-main"><div className="utilization-ring"><strong>78%</strong><span>užimtumas</span></div><div className="utilization-legend"><span><i className="red"/>Rezervuota <strong>126 val.</strong></span><span><i className="green"/>Laisva <strong>36 val.</strong></span><span><i className="gray"/>Servisas <strong>12 val.</strong></span></div></div></section>
    </div>

    {selected && <VehicleDrawer vehicle={selected} onClose={()=>setSelected(null)} showNotice={showNotice}/>}
    {addOpen && <AddVehicleModal onClose={()=>setAddOpen(false)} onSave={()=>{setAddOpen(false);showNotice("Transporto priemonė pridėta")}}/>}
  </div>;
}

function VehicleDrawer({ vehicle, onClose, showNotice }: { vehicle:(typeof vehicles)[number]; onClose:()=>void; showNotice:(m:string)=>void }) {
  const [tab, setTab] = useState("info");
  return <div className="drawer-layer" role="dialog" aria-modal="true" aria-label={`${vehicle.make} informacija`}><button className="drawer-scrim" onClick={onClose} aria-label="Uždaryti"/><aside className="vehicle-drawer"><div className="drawer-head"><div><span>TRANSPORTO KORTELĖ</span><h2>{vehicle.make}</h2><p>{vehicle.plate} · {vehicle.year} m.</p></div><button className="icon-button" onClick={onClose} aria-label="Uždaryti"><Icon name="close"/></button></div><div className="drawer-car" style={{background:`linear-gradient(145deg,${vehicle.color}1f,#f6f6f7)`}}><Icon name="car" size={70}/><i className={`status-chip ${vehicle.statusKey}`}>{vehicle.status}</i></div><div className="drawer-tabs"><button className={tab==="info"?"active":""} onClick={()=>setTab("info")}>Informacija</button><button className={tab==="service"?"active":""} onClick={()=>setTab("service")}>Priežiūra</button><button className={tab==="schedule"?"active":""} onClick={()=>setTab("schedule")}>Grafikas</button></div>{tab==="info"&&<div className="drawer-content"><div className="detail-grid"><div><span>Valst. numeris</span><strong>{vehicle.plate}</strong></div><div><span>Kategorija</span><strong>{vehicle.category}</strong></div><div><span>Pavarų dėžė</span><strong>{vehicle.gearbox}</strong></div><div><span>Dabartinė rida</span><strong>{vehicle.mileage}</strong></div></div><div className="assignment-box"><span className="student-avatar" style={{background:vehicle.color}}>IN</span><div><span>Priskirtas instruktorius</span><strong>{vehicle.instructor}</strong><small>{vehicle.branch}</small></div><button onClick={()=>showNotice("Atidarytas priskyrimo keitimas")}>Keisti</button></div><h3>Dokumentai</h3><div className="document-list"><div><span><Icon name="shield" size={18}/></span><div><strong>Techninė apžiūra</strong><small>Galioja iki {vehicle.technical}</small></div><i className="status-chip available">Galioja</i></div><div><span><Icon name="file" size={18}/></span><div><strong>Draudimas</strong><small>Galioja iki {vehicle.insurance}</small></div><i className="status-chip available">Galioja</i></div></div></div>}{tab==="service"&&<div className="drawer-content"><div className="service-hero"><span><Icon name="gauge"/></span><div><small>Kita planinė priežiūra</small><strong>{vehicle.service}</strong></div></div><h3>Priežiūros istorija</h3><div className="history-line"><i/><div><strong>Periodinis aptarnavimas</strong><span>2026-05-18 · 35 000 km</span><p>Pakeista alyva, filtrai ir patikrinta stabdžių sistema.</p></div></div><div className="history-line"><i/><div><strong>Padangų keitimas</strong><span>2026-03-30 · 31 240 km</span><p>Sumontuotos vasarinės padangos.</p></div></div><button className="primary-button drawer-action" onClick={()=>showNotice("Priežiūros darbas suplanuotas")}>Planuoti priežiūrą</button></div>}{tab==="schedule"&&<div className="drawer-content"><div className="schedule-summary"><strong>{vehicle.bookings}</strong><span>rezervacijų šią savaitę</span></div><div className="mini-booking"><span>ANTRADIENIS</span><strong>09:00–10:30 · Lukas Petrauskas</strong><small>{vehicle.instructor}</small></div><div className="mini-booking"><span>TREČIADIENIS</span><strong>14:00–15:30 · Gabija Jankauskaitė</strong><small>{vehicle.instructor}</small></div><button className="secondary-button drawer-action" onClick={()=>showNotice("Atidarytas automobilio kalendorius")}>Atidaryti visą grafiką</button></div>}<div className="drawer-footer"><button className="secondary-button" onClick={()=>showNotice("Transporto kortelė redaguojama")}>Redaguoti</button><button className="primary-button" onClick={()=>showNotice("Būsena pakeista")}>Keisti būseną</button></div></aside></div>;
}

function AddVehicleModal({ onClose, onSave }: { onClose:()=>void; onSave:()=>void }) {
  return <div className="modal-layer" role="dialog" aria-modal="true" aria-label="Pridėti transporto priemonę"><button className="modal-scrim" onClick={onClose} aria-label="Uždaryti"/><div className="modal-card"><div className="modal-head"><div><span>NAUJA TRANSPORTO PRIEMONĖ</span><h2>Pridėti į transporto parką</h2></div><button className="icon-button" onClick={onClose}><Icon name="close"/></button></div><div className="form-grid"><label><span>Markė ir modelis</span><input placeholder="Pvz., Toyota Corolla"/></label><label><span>Valstybinis numeris</span><input placeholder="ABC 123"/></label><label><span>Pagaminimo metai</span><input type="number" defaultValue="2026"/></label><label><span>Kategorija</span><select><option>B</option><option>C</option><option>CE</option><option>D</option></select></label><label><span>Pavarų dėžė</span><select><option>Automatinė</option><option>Mechaninė</option></select></label><label><span>Dabartinė rida</span><input placeholder="0 km"/></label><label className="wide"><span>Filialas</span><select><option>Centro skyrius</option><option>Šiaurės skyrius</option><option>Pietų skyrius</option></select></label></div><div className="modal-actions"><button className="secondary-button" onClick={onClose}>Atšaukti</button><button className="primary-button" onClick={onSave}><Icon name="check" size={17}/>Pridėti automobilį</button></div></div></div>;
}

function PublicRegistrationView({ onExit }: { onExit:()=>void }) {
  const [step,setStep]=useState(1);
  const [category,setCategory]=useState("B");
  const [gearbox,setGearbox]=useState("Automatinė");
  const [branch,setBranch]=useState("Šiaurės skyrius");
  const [startTime,setStartTime]=useState("Rytinė grupė");
  const [medicalUploaded,setMedicalUploaded]=useState(false);
  const [idUploaded,setIdUploaded]=useState(false);
  const [payment,setPayment]=useState("advance");
  const [processing,setProcessing]=useState(false);
  const [completed,setCompleted]=useState(false);
  const price=category==="B"?(gearbox==="Automatinė"?450:400):category==="A2"?420:620;
  const stepLabels=["Mokymai","Duomenys","Dokumentai","Apmokėjimas"];

  function completeRegistration(){
    setProcessing(true);
    window.setTimeout(()=>{setProcessing(false);setCompleted(true)},1100);
  }

  return <main className="public-registration-page">
    <header className="public-registration-header"><button className="public-title" onClick={onExit}>Vairavimo mokyklos demonstracinė aplikacija</button><div><span>Jau esate mokinys?</span><button onClick={onExit}>Prisijungti</button></div></header>
    <div className="public-registration-shell">
      <aside className="public-registration-intro">
        <button className="public-back" onClick={onExit}>← Grįžti į demonstraciją</button>
        <span className="public-eyebrow">REGISTRACIJA INTERNETU</span>
        <h1>Pradėkite vairuoti.<br/>Visa kita – paprasta.</h1>
        <p>Pasirinkite mokymus, pateikite duomenis ir rezervuokite vietą. Registracija užtruks apie 5 minutes.</p>
        <div className="public-benefits"><span><i><Icon name="check" size={15}/></i><b>Elektroninė sutartis</b><small>Paruošiama automatiškai</small></span><span><i><Icon name="calendar" size={15}/></i><b>Lankstus grafikas</b><small>Pasirinkite jums tinkamą grupę</small></span><span><i><Icon name="shield" size={15}/></i><b>Saugus apmokėjimas</b><small>Banko kortele per Stripe</small></span></div>
        <div className="public-help"><span>?</span><div><small>Turite klausimų?</small><strong>+370 600 12 345</strong><p>I–V 8:00–18:00</p></div></div>
      </aside>

      <section className="public-registration-main">
        {!completed?<div className="public-form-card">
          <div className="public-form-top"><span>ŽINGSNIS {step} IŠ 4</span><strong>{Math.round(step/4*100)}% užpildyta</strong></div>
          <div className="public-progress"><i><em style={{width:`${step/4*100}%`}}/></i><div>{stepLabels.map((label,index)=><button key={label} className={step>=index+1?"active":""} onClick={()=>index+1<step&&setStep(index+1)}><span>{step>index+1?<Icon name="check" size={12}/>:index+1}</span>{label}</button>)}</div></div>

          {step===1&&<div className="public-step-content"><div className="public-step-heading"><span>01</span><div><h2>Kokius mokymus renkatės?</h2><p>Pasirinkimą galėsite pakeisti pasikonsultavę su administratoriumi.</p></div></div><label className="public-field-label">Vairavimo kategorija</label><div className="public-category-grid">{[{key:"B",title:"B kategorija",meta:"Lengvasis automobilis",icon:"B"},{key:"A2",title:"A2 kategorija",meta:"Motociklas iki 35 kW",icon:"A2"},{key:"C",title:"C kategorija",meta:"Krovininis automobilis",icon:"C"}].map(item=><button key={item.key} className={category===item.key?"active":""} onClick={()=>setCategory(item.key)}><i>{item.icon}</i><span><strong>{item.title}</strong><small>{item.meta}</small></span>{category===item.key&&<b><Icon name="check" size={12}/></b>}</button>)}</div>{category==="B"&&<><label className="public-field-label">Pavarų dėžė</label><div className="public-option-row">{["Mechaninė","Automatinė"].map(item=><button key={item} className={gearbox===item?"active":""} onClick={()=>setGearbox(item)}><span><Icon name="car" size={18}/></span><div><strong>{item}</strong><small>{item==="Mechaninė"?"Galėsite vairuoti abiejų tipų automobilius":"Mokysitės automobiliu su automatine dėže"}</small></div><i>{gearbox===item?"✓":""}</i></button>)}</div></>}<div className="public-two-fields"><label><span>Filialas</span><select value={branch} onChange={e=>setBranch(e.target.value)}><option>Šiaurės skyrius</option><option>Centro skyrius</option><option>Pietų skyrius</option></select></label><label><span>Pageidaujamas laikas</span><select value={startTime} onChange={e=>setStartTime(e.target.value)}><option>Rytinė grupė</option><option>Dieninė grupė</option><option>Vakarinė grupė</option><option>Savaitgaliais</option></select></label></div></div>}

          {step===2&&<div className="public-step-content"><div className="public-step-heading"><span>02</span><div><h2>Jūsų kontaktiniai duomenys</h2><p>Pagal juos sukursime mokinio paskyrą ir mokymo sutartį.</p></div></div><div className="public-data-grid"><label><span>Vardas</span><input defaultValue="Jonas"/></label><label><span>Pavardė</span><input defaultValue="Jonaitis"/></label><label><span>El. paštas</span><input type="email" defaultValue="jonas.jonaitis@email.lt"/></label><label><span>Telefono numeris</span><input defaultValue="+370 612 34 567"/></label><label><span>Gimimo data</span><input type="date" defaultValue="2004-08-17"/></label><label><span>Asmens kodas</span><input defaultValue="4040817••••"/></label><label className="wide"><span>Gyvenamosios vietos adresas</span><input defaultValue="Kalvarijų g. 24-12, Vilnius"/></label></div><div className="public-consent-box"><label><input type="checkbox" defaultChecked/><span><strong>Sutinku su asmens duomenų tvarkymu</strong><small>Duomenys bus naudojami mokymo sutarčiai ir mokinio paskyrai sukurti.</small></span></label><label><input type="checkbox" defaultChecked/><span><strong>Sutinku pasirašyti sutartį elektroniniu būdu</strong><small>Pasirašymo nuoroda bus išsiųsta nurodytu el. paštu.</small></span></label></div></div>}

          {step===3&&<div className="public-step-content"><div className="public-step-heading"><span>03</span><div><h2>Pridėkite turimus dokumentus</h2><p>Dokumentus galima pateikti ir vėliau mokinio savitarnoje.</p></div></div><div className="public-upload-list"><button className={idUploaded?"uploaded":""} onClick={()=>setIdUploaded(true)}><span><Icon name={idUploaded?"check":"upload"} size={19}/></span><div><strong>Asmens dokumento kopija</strong><small>{idUploaded?"asmens_dokumentas.jpg · 1,2 MB":"JPG, PNG arba PDF · iki 10 MB"}</small></div><em>{idUploaded?"Įkelta":"Pasirinkti failą"}</em></button><button className={medicalUploaded?"uploaded":""} onClick={()=>setMedicalUploaded(true)}><span><Icon name={medicalUploaded?"check":"upload"} size={19}/></span><div><strong>Medicininė pažyma</strong><small>{medicalUploaded?"medicinine_pazyma.pdf · 684 KB":"Nebūtina registracijos metu"}</small></div><em>{medicalUploaded?"Įkelta":"Pasirinkti failą"}</em></button></div><div className="public-ocr-note"><span>✦</span><div><strong>Duomenis nuskaitysime automatiškai</strong><p>Įkeltus dokumentus sistema atpažins, susies su jūsų byla ir informuos, jei ko nors trūksta.</p></div></div><div className="public-doc-checklist"><strong>Registracijos būsena</strong><span><i className="done"><Icon name="check" size={11}/></i>Kontaktiniai duomenys užpildyti</span><span><i className={idUploaded?"done":"pending"}>{idUploaded?<Icon name="check" size={11}/>:"!"}</i>Asmens dokumentas {idUploaded?"pridėtas":"dar nepridėtas"}</span><span><i className={medicalUploaded?"done":"optional"}>{medicalUploaded?<Icon name="check" size={11}/>:"–"}</i>Medicininė pažyma {medicalUploaded?"pridėta":"galima pateikti vėliau"}</span></div></div>}

          {step===4&&<div className="public-step-content"><div className="public-step-heading"><span>04</span><div><h2>Patvirtinkite ir apmokėkite</h2><p>Po apmokėjimo iškart sukursime jūsų mokinio paskyrą.</p></div></div><div className="public-order-summary"><div><span><Icon name="book" size={18}/></span><div><small>Pasirinkti mokymai</small><strong>{category} kategorija{category==="B"?` · ${gearbox.toLowerCase()}`:""}</strong><p>{branch} · {startTime.toLowerCase()}</p></div><button onClick={()=>setStep(1)}>Keisti</button></div><div><span>Kurso kaina</span><strong>{price} €</strong></div></div><div className="public-payment-choice"><button className={payment==="advance"?"active":""} onClick={()=>setPayment("advance")}><span>Registracijos avansas</span><strong>200 €</strong><small>Likusi suma iki pirmos praktikos</small>{payment==="advance"&&<i><Icon name="check" size={12}/></i>}</button><button className={payment==="full"?"active":""} onClick={()=>setPayment("full")}><span>Visa kurso suma</span><strong>{price} €</strong><small>Vienas mokėjimas be likučio</small>{payment==="full"&&<i><Icon name="check" size={12}/></i>}</button></div><div className="public-stripe-box"><div className="stripe-checkout-head"><div><span>Apmokėjimas kortele</span><small>Saugi demonstracinė Stripe forma</small></div><strong>stripe</strong></div><label className="stripe-card-field"><span>Kortelės numeris</span><div><em>VISA</em><input defaultValue="4242 4242 4242 4242"/></div></label><div className="stripe-fields-row"><label><span>Galioja iki</span><input defaultValue="12 / 29"/></label><label><span>CVC</span><input defaultValue="123"/></label></div><button className="stripe-pay-button" onClick={completeRegistration} disabled={processing}>{processing?<><i className="payment-spinner"/>Kuriama paskyra...</>:<><Icon name="shield" size={16}/>Apmokėti {payment==="advance"?200:price} € ir registruotis</>}</button><p><Icon name="shield" size={12}/>Tai demonstracija – realus mokėjimas nebus atliktas</p></div></div>}

          {step<4&&<div className="public-form-footer"><button className="public-previous" onClick={()=>step===1?onExit():setStep(step-1)}>{step===1?"Atšaukti":"← Atgal"}</button><div><span>Jūsų pasirinkimas: <strong>{category} kategorija</strong></span><button className="public-next" onClick={()=>setStep(step+1)}>Tęsti <Icon name="arrow" size={16}/></button></div></div>}
        </div>:<div className="public-success-card"><span><Icon name="check" size={34}/></span><small>REGISTRACIJA BAIGTA</small><h2>Sveiki prisijungę, Jonai!</h2><p>Jūsų mokinio paskyra sukurta, o registracijos patvirtinimą ir sutarties pasirašymo nuorodą išsiuntėme el. paštu.</p><div className="public-success-number"><small>REGISTRACIJOS NUMERIS</small><strong>VM-2026-2087</strong></div><section><div><Icon name="check" size={16}/><span><strong>Mokinio paskyra sukurta</strong><small>Prisijungimo nuoroda išsiųsta el. paštu</small></span></div><div><Icon name="file" size={16}/><span><strong>Sutartis paruošta</strong><small>Laukia elektroninio parašo</small></span></div><div><Icon name="card" size={16}/><span><strong>Mokėjimas patvirtintas</strong><small>{payment==="advance"?"200 € avansas":`${price} € visa suma`} · kvitas išsiųstas</small></span></div></section><button onClick={onExit}>Grįžti į demonstracinę aplikaciją <Icon name="arrow" size={16}/></button><em>Demonstracinė registracija – duomenys neišsaugomi.</em></div>}
        <footer className="public-registration-footer"><span>© 2026 Vairavimo mokyklos demonstracinė aplikacija</span><div><button>Privatumo politika</button><button>Taisyklės</button><button>Pagalba</button></div></footer>
      </section>
    </div>
  </main>;
}

const reportMonths = [
  { month: "Vas", revenue: 22.4, received: 20.8 },
  { month: "Kov", revenue: 25.8, received: 23.9 },
  { month: "Bal", revenue: 24.1, received: 22.7 },
  { month: "Geg", revenue: 29.6, received: 27.8 },
  { month: "Bir", revenue: 32.1, received: 30.4 },
  { month: "Lie", revenue: 34.8, received: 32.9 },
];

const instructorReports = [
  { initials: "DS", name: "Darius Siudikas", lessons: 112, hours: 168, occupancy: 94, rating: "4,9", revenue: "9 840 €", color: "#e73f49" },
  { initials: "VJ", name: "Vesta Jankauskienė", lessons: 104, hours: 156, occupancy: 89, rating: "4,8", revenue: "9 120 €", color: "#6575d8" },
  { initials: "TN", name: "Tomas Noreika", lessons: 87, hours: 130.5, occupancy: 82, rating: "4,7", revenue: "7 640 €", color: "#239574" },
  { initials: "MB", name: "Mantas Balsys", lessons: 76, hours: 114, occupancy: 74, rating: "4,6", revenue: "6 180 €", color: "#d28a2f" },
];

const journalEntries = [
  { id:1, student:"Lukas Petrauskas", initials:"LP", branch:"Centro skyrius", instructor:"Darius Siudikas", vehicle:"Toyota Corolla", plate:"JTD 248", category:"B", date:"2026-07-22", time:"09:00–10:30", lesson:"20 pamoka", startMileage:42180, endMileage:42214, route:"Miesto maršrutai ir persirikiavimas", status:"Paruošta spausdinti", statusKey:"ready", color:"#e73f49" },
  { id:2, student:"Gabija Jankauskaitė", initials:"GJ", branch:"Šiaurės skyrius", instructor:"Vesta Jankauskienė", vehicle:"Volkswagen Golf", plate:"MOK 517", category:"B", date:"2026-07-22", time:"11:00–12:30", lesson:"11 pamoka", startMileage:58940, endMileage:58968, route:"Parkavimas ir apsisukimas", status:"Laukia instruktoriaus", statusKey:"pending", color:"#6575d8" },
  { id:3, student:"Mantas Žukauskas", initials:"MŽ", branch:"Centro skyrius", instructor:"Darius Siudikas", vehicle:"Toyota Corolla", plate:"JTD 248", category:"B", date:"2026-07-21", time:"14:00–15:30", lesson:"Baigiamasis važiavimas", startMileage:42142, endMileage:42176, route:"Egzamino maršruto kartojimas", status:"Atspausdinta ir pasirašyta", statusKey:"printed", color:"#239574" },
  { id:4, student:"Emilija Kazlauskaitė", initials:"EK", branch:"Pietų skyrius", instructor:"Tomas Noreika", vehicle:"Honda CB500F", plate:"MOT 224", category:"A2", date:"2026-07-22", time:"14:00–15:30", lesson:"4 pamoka", startMileage:18320, endMileage:18341, route:"Manevravimas mokymo aikštelėje", status:"Paruošta spausdinti", statusKey:"ready", color:"#d6933b" },
  { id:5, student:"Tadas Norkus", initials:"TN", branch:"Vakarų skyrius", instructor:"Tomas Noreika", vehicle:"MAN TGL", plate:"CEN 440", category:"C", date:"2026-07-22", time:"15:30–17:00", lesson:"6 pamoka", startMileage:126800, endMileage:126837, route:"Krovininio automobilio valdymas mieste", status:"Laukia instruktoriaus", statusKey:"pending", color:"#4c83b6" },
];

function DrivingJournalModule({ onBack, showNotice, selectedBranch, role }: { onBack:()=>void; showNotice:(m:string)=>void; selectedBranch:string; role:Role }) {
  const branchEntries=journalEntries.filter((entry)=>selectedBranch==="Visi skyriai"||entry.branch===selectedBranch);
  const [selectedId,setSelectedId]=useState(branchEntries[0]?.id??journalEntries[0].id);
  const [status,setStatus]=useState("Visi įrašai");
  const [query,setQuery]=useState("");
  const [previewOpen,setPreviewOpen]=useState(false);
  const [confirmed,setConfirmed]=useState<number[]>([]);
  const selected=branchEntries.find((entry)=>entry.id===selectedId)??branchEntries[0]??journalEntries[0];
  const filtered=branchEntries.filter((entry)=>(status==="Visi įrašai"||entry.status===status)&&`${entry.student} ${entry.instructor} ${entry.plate}`.toLowerCase().includes(query.toLowerCase()));
  const entryStatus=confirmed.includes(selected.id)?"Paruošta spausdinti":selected.status;

  function confirmEntry(){
    setConfirmed((items)=>items.includes(selected.id)?items:[...items,selected.id]);
    showNotice("Pamokos duomenys patvirtinti – vairavimo lapas paruoštas");
  }

  return <div className="journal-page">
    <button className="back-link" onClick={onBack}>← Grįžti į apžvalgą</button>
    <PageHeading eyebrow="PRAKTINIO VAIRAVIMO APSKAITA" title="Vairavimo žurnalas" text="Pamokos duomenys surenkami automatiškai, patvirtinami ir paruošiami oficialiai apskaitos formai." action={<button className="primary-button standalone" onClick={()=>setPreviewOpen(true)}><Icon name="file" size={17}/>Peržiūrėti vairavimo lapą</button>}/>

    <section className="journal-compliance-banner">
      <div className="journal-compliance-icon"><Icon name="shield" size={23}/></div>
      <div><span>HIBRIDINIS APSKAITOS REŽIMAS</span><h2>Skaitmeninė apskaita + spausdinamas vairavimo lapas</h2><p>Kol laukiama LTSA išaiškinimo, sistema paruošia visus duomenis ir PDF, tačiau oficialus dokumentas pažymimas atspausdintu ir pasirašytu.</p></div>
      <i><span/>Laukiama LTSA išaiškinimo</i>
    </section>

    <div className="journal-stats">
      <StatCard icon="calendar" label="Šiandienos pamokos" value={String(branchEntries.filter(e=>e.date==="2026-07-22").length)} note="Duomenys surinkti automatiškai" tone="red"/>
      <StatCard icon="clock" label="Laukia patvirtinimo" value={String(Math.max(0,branchEntries.filter(e=>e.statusKey==="pending").length-confirmed.length))} note="Turi patvirtinti instruktorius" tone="blue"/>
      <StatCard icon="file" label="Paruošti lapai" value={String(branchEntries.filter(e=>e.statusKey==="ready").length+confirmed.length)} note="Galima generuoti PDF" tone="amber"/>
      <StatCard icon="check" label="Perkelta į mokinio kortelę" value="100%" note="Valandos atnaujintos" tone="green"/>
    </div>

    <section className="panel journal-process-card">
      <div className="journal-process-head"><div><span>KAIP VEIKIA</span><h2>Vienas įrašas – be pakartotinio suvedimo</h2></div><small><i/> Kontroliuojamas procesas</small></div>
      <div className="journal-process-flow">
        {[{n:"1",icon:"calendar" as IconName,title:"Pamoka suplanuota",text:"Duomenys iš kalendoriaus"},{n:"2",icon:"car" as IconName,title:"Faktas užfiksuotas",text:"Laikas, automobilis ir rida"},{n:"3",icon:"check" as IconName,title:"Instruktorius patvirtina",text:"Patikrina pamokos informaciją"},{n:"4",icon:"file" as IconName,title:"Paruošiamas lapas",text:"PDF spausdinimui ir parašui"}].map((step,index)=><div key={step.n}><span><Icon name={step.icon} size={17}/></span><i>{step.n}</i><strong>{step.title}</strong><small>{step.text}</small>{index<3&&<em>→</em>}</div>)}
      </div>
    </section>

    <div className="journal-workspace">
      <section className="panel journal-list-card">
        <div className="journal-list-toolbar"><div><h2>Apskaitos įrašai</h2><p>2026 m. liepos 20–26 d.</p></div><label><Icon name="search" size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Mokinys ar automobilis"/></label><select value={status} onChange={e=>setStatus(e.target.value)}><option>Visi įrašai</option><option>Laukia instruktoriaus</option><option>Paruošta spausdinti</option><option>Atspausdinta ir pasirašyta</option></select></div>
        <div className="journal-list-head"><span>DATA / LAIKAS</span><span>MOKINYS</span><span>INSTRUKTORIUS IR AUTOMOBILIS</span><span>RIDA / KM</span><span>BŪSENA</span></div>
        <div className="journal-entry-list">{filtered.map((entry)=><button key={entry.id} className={selected.id===entry.id?"active":""} onClick={()=>setSelectedId(entry.id)}><span><strong>{entry.date.slice(5).replace("-","-")}</strong><small>{entry.time}</small></span><span className="journal-student"><i style={{background:entry.color}}>{entry.initials}</i><span><strong>{entry.student}</strong><small>{entry.lesson} · {entry.category} kat.</small></span></span><span><strong>{entry.instructor}</strong><small>{entry.vehicle} · {entry.plate}</small></span><span><strong>{entry.endMileage-entry.startMileage} km</strong><small>{entry.startMileage.toLocaleString("lt-LT")} → {entry.endMileage.toLocaleString("lt-LT")}</small></span><span><i className={`journal-status ${confirmed.includes(entry.id)?"ready":entry.statusKey}`}>{confirmed.includes(entry.id)?"Paruošta spausdinti":entry.status}</i></span></button>)}</div>
      </section>

      <aside className="panel journal-detail-card">
        <div className="journal-detail-head"><div><span>VAIRAVIMO LAPO ĮRAŠAS</span><h2>{selected.student}</h2><p>{selected.lesson} · {selected.date}</p></div><i className={`journal-status ${confirmed.includes(selected.id)?"ready":selected.statusKey}`}>{entryStatus}</i></div>
        <div className="journal-auto-note"><span>✦</span><div><strong>Duomenys užpildyti automatiškai</strong><p>Iš kalendoriaus, automobilio kortelės ir mokinio bylos.</p></div></div>
        <div className="journal-detail-grid"><div><span>Mokymo kategorija</span><strong>{selected.category}</strong></div><div><span>Pamokos trukmė</span><strong>1 val. 30 min.</strong></div><div><span>Instruktorius</span><strong>{selected.instructor}</strong></div><div><span>Automobilis</span><strong>{selected.vehicle} · {selected.plate}</strong></div><div><span>Pradinė rida</span><strong>{selected.startMileage.toLocaleString("lt-LT")} km</strong></div><div><span>Galinė rida</span><strong>{selected.endMileage.toLocaleString("lt-LT")} km</strong></div></div>
        <label className="journal-route-field"><span>Mokymo tema / maršrutas</span><textarea defaultValue={selected.route}/></label>
        <div className="journal-sync-list"><span><Icon name="check" size={13}/> Pridėta 1,5 val. mokinio progresui</span><span><Icon name="check" size={13}/> Atnaujinta automobilio rida</span><span><Icon name="check" size={13}/> Išsaugota pakeitimų istorija</span></div>
        <div className="journal-detail-actions">{entryStatus==="Laukia instruktoriaus"?<button className="primary-button" onClick={confirmEntry}><Icon name="check" size={16}/>{role==="instructor"?"Patvirtinti pamoką":"Patvirtinti instruktoriaus vardu"}</button>:<button className="primary-button" onClick={()=>setPreviewOpen(true)}><Icon name="file" size={16}/>Generuoti PDF</button>}<button className="secondary-button" onClick={()=>showNotice("Įrašas pažymėtas atspausdintu ir pasirašytu")}><Icon name="download" size={16}/>Pažymėti atspausdintu</button></div>
      </aside>
    </div>

    {previewOpen&&<div className="modal-layer" role="dialog" aria-modal="true" aria-label="Vairavimo lapo peržiūra"><button className="modal-scrim" onClick={()=>setPreviewOpen(false)} aria-label="Uždaryti"/><div className="journal-preview-modal"><div className="journal-preview-top"><div><span>SPAUSDINIMO PERŽIŪRA</span><h2>Praktinio vairavimo mokymo apskaitos žurnalas</h2></div><button className="icon-button" onClick={()=>setPreviewOpen(false)}><Icon name="close"/></button></div><div className="journal-paper"><strong>PRAKTINIO VAIRAVIMO MOKYMO APSKAITOS ŽURNALAS (VAIRAVIMO LAPAS)</strong><p>Vairavimo mokyklos demonstracinė aplikacija</p><div className="journal-paper-grid"><span><small>Mokinys</small><b>{selected.student}</b></span><span><small>Gimimo data</small><b>2004-08-17</b></span><span><small>Kategorija</small><b>{selected.category}</b></span><span><small>Instruktorius</small><b>{selected.instructor}</b></span><span><small>Transporto priemonė</small><b>{selected.vehicle} · {selected.plate}</b></span><span><small>Data ir laikas</small><b>{selected.date} · {selected.time}</b></span></div><table><thead><tr><th>Pamoka</th><th>Mokymo tema</th><th>Pradinė rida</th><th>Galinė rida</th><th>Trukmė</th></tr></thead><tbody><tr><td>{selected.lesson}</td><td>{selected.route}</td><td>{selected.startMileage} km</td><td>{selected.endMileage} km</td><td>1,5 val.</td></tr></tbody></table><div className="journal-signatures"><span>Instruktoriaus parašas</span><span>Mokinio parašas</span></div><em>Dokumentas sugeneruotas iš sistemoje patvirtintų duomenų.</em></div><div className="journal-preview-actions"><button className="secondary-button" onClick={()=>setPreviewOpen(false)}>Uždaryti</button><button className="primary-button" onClick={()=>{setPreviewOpen(false);showNotice("Vairavimo lapo PDF paruoštas spausdinimui")}}><Icon name="download" size={16}/>Generuoti PDF spausdinimui</button></div></div></div>}
  </div>;
}

function ReportsModule({ onBack, showNotice, selectedBranch }: { onBack:()=>void; showNotice:(m:string)=>void; selectedBranch:string }) {
  const [period,setPeriod]=useState("Liepa 2026");
  const [branch,setBranch]=useState(selectedBranch==="Visi skyriai"?"Visi filialai":selectedBranch);
  const [compare,setCompare]=useState(true);
  const [selectedMonth,setSelectedMonth]=useState(5);
  const [reportTab,setReportTab]=useState("Veiklos rezultatai");
  const [exportOpen,setExportOpen]=useState(false);
  const [exporting,setExporting]=useState<string|null>(null);
  const branchFactor=branch==="Visi filialai"?1:branch==="Centro skyrius"?.46:branch==="Šiaurės skyrius"?.34:.2;
  const selected=reportMonths[selectedMonth];
  const formatMoney=(value:number)=>`${(value*branchFactor).toLocaleString("lt-LT",{minimumFractionDigits:1,maximumFractionDigits:1})} tūkst. €`;

  function runExport(format:string,label="Mėnesio veiklos ataskaita") {
    setExporting(format);
    window.setTimeout(()=>{
      setExporting(null);
      setExportOpen(false);
      showNotice(`${label} paruošta ${format} formatu`);
    },900);
  }

  return <div className="reports-page">
    <button className="back-link" onClick={onBack}>← Grįžti į apžvalgą</button>
    <PageHeading eyebrow="VEIKLOS ANALITIKA" title="Ataskaitos" text="Finansų, mokinių, pamokų ir instruktorių rodikliai vienoje vietoje." action={<div className="reports-heading-actions"><button className="secondary-button" onClick={()=>showNotice("Ataskaitos duomenys atnaujinti")}><span className="report-live-dot"/>Atnaujinta 12:32</button><button className="primary-button standalone" onClick={()=>setExportOpen(true)}><Icon name="download" size={17}/>Eksportuoti</button></div>}/>

    <section className="panel reports-filter-bar">
      <div className="report-view-tabs" aria-label="Ataskaitų grupės">{["Veiklos rezultatai","Finansai","Mokiniai","Dokumentai"].map(tab=><button key={tab} className={reportTab===tab?"active":""} onClick={()=>{setReportTab(tab);showNotice(`Rodoma ataskaita: ${tab}`)}}>{tab}</button>)}</div>
      <div className="reports-filters"><label><span>Laikotarpis</span><select value={period} onChange={e=>setPeriod(e.target.value)}><option>Liepa 2026</option><option>Birželis 2026</option><option>II ketvirtis 2026</option><option>2026 metai</option></select></label><label><span>Filialas</span><select value={branch} onChange={e=>setBranch(e.target.value)}><option>Visi filialai</option><option>Centro skyrius</option><option>Šiaurės skyrius</option><option>Pietų skyrius</option></select></label><button className={`compare-toggle ${compare?"active":""}`} onClick={()=>setCompare(!compare)} role="switch" aria-checked={compare}><i/><span><strong>Palyginti</strong><small>su ankstesniu laikotarpiu</small></span></button></div>
    </section>

    <div className="report-kpi-grid">
      <article><div><span>Pajamos</span><strong>{formatMoney(34.82)}</strong></div><em className="positive">↑ 8,4%</em><div className="report-spark bars-red"><i/><i/><i/><i/><i/><i/></div><small>Planas įvykdytas 96%</small></article>
      <article><div><span>Gauta mokėjimų</span><strong>{formatMoney(32.94)}</strong></div><em className="positive">↑ 6,1%</em><div className="report-spark bars-green"><i/><i/><i/><i/><i/><i/></div><small>1,88 tūkst. € dar negauta</small></article>
      <article><div><span>Nauji mokiniai</span><strong>{Math.round(31*branchFactor)}</strong></div><em className="positive">↑ 12,0%</em><div className="report-spark bars-blue"><i/><i/><i/><i/><i/><i/></div><small>248 aktyvūs mokiniai</small></article>
      <article><div><span>Pamokų užimtumas</span><strong>{Math.round(87*branchFactor+(branchFactor<1?45:0))}%</strong></div><em className="negative">↓ 1,6%</em><div className="report-spark bars-amber"><i/><i/><i/><i/><i/><i/></div><small>379 iš 436 laikų rezervuoti</small></article>
    </div>

    <div className="reports-main-grid">
      <section className="panel revenue-report-card">
        <div className="report-card-head"><div><h2>Pajamos ir mokėjimai</h2><p>Priskaičiuota suma ir realiai gauti mokėjimai</p></div><div className="chart-legend"><span><i className="revenue"/>Pajamos</span><span><i className="received"/>Gauta</span></div></div>
        <div className="revenue-chart" aria-label="Šešių mėnesių pajamų diagrama"><div className="chart-scale"><span>40 tūkst.</span><span>30 tūkst.</span><span>20 tūkst.</span><span>10 tūkst.</span><span>0</span></div><div className="chart-bars">{reportMonths.map((item,index)=><button key={item.month} className={selectedMonth===index?"active":""} onClick={()=>setSelectedMonth(index)} aria-label={`${item.month}: ${item.revenue} tūkstančio eurų pajamų`}><span className="bar-pair"><i className="revenue" style={{height:`${item.revenue/40*100}%`}}/><i className="received" style={{height:`${item.received/40*100}%`}}/></span><strong>{item.month}</strong></button>)}</div></div>
        <div className="chart-selection"><span><small>Pasirinktas mėnuo</small><strong>{selected.month} · 2026</strong></span><span><small>Pajamos</small><strong>{formatMoney(selected.revenue)}</strong></span><span><small>Gauta</small><strong>{formatMoney(selected.received)}</strong></span><span><small>Surinkimo rodiklis</small><strong>{Math.round(selected.received/selected.revenue*100)}%</strong></span></div>
      </section>

      <section className="panel category-report-card">
        <div className="report-card-head"><div><h2>Pajamos pagal kategoriją</h2><p>{period} · {branch}</p></div><button aria-label="Daugiau veiksmų" onClick={()=>showNotice("Atidarytas pajamų detalizavimas")}>•••</button></div>
        <div className="donut-wrap"><div className="report-donut"><div><strong>{formatMoney(34.82)}</strong><span>Iš viso</span></div></div><div className="donut-legend"><button onClick={()=>showNotice("B kategorija: 23,3 tūkst. €")}><i className="cat-b"/><span><strong>B kategorija</strong><small>67% · 23,3 tūkst. €</small></span></button><button onClick={()=>showNotice("A ir A2 kategorijos: 5,9 tūkst. €")}><i className="cat-a"/><span><strong>A / A2</strong><small>17% · 5,9 tūkst. €</small></span></button><button onClick={()=>showNotice("C ir CE kategorijos: 4,2 tūkst. €")}><i className="cat-c"/><span><strong>C / CE</strong><small>12% · 4,2 tūkst. €</small></span></button><button onClick={()=>showNotice("Papildomos paslaugos: 1,4 tūkst. €")}><i className="cat-other"/><span><strong>Kita</strong><small>4% · 1,4 tūkst. €</small></span></button></div></div>
        <div className="payment-health"><div><span>Mokėjimų surinkimas</span><strong>94,6%</strong></div><i><em style={{width:"94.6%"}}/></i><p><span><b/>Apmokėta 32 940 €</span><span><b/>Laukia 1 880 €</span></p></div>
      </section>
    </div>

    <div className="reports-lower-grid">
      <section className="panel instructor-report-card">
        <div className="report-card-head"><div><h2>Instruktorių rezultatai</h2><p>Pamokos, užimtumas ir klientų įvertinimai</p></div><button onClick={()=>showNotice("Atidaryta išsami instruktorių ataskaita")}>Visa ataskaita <Icon name="arrow" size={15}/></button></div>
        <div className="instructor-report-head"><span>INSTRUKTORIUS</span><span>PAMOKOS</span><span>UŽIMTUMAS</span><span>ĮVERTINIMAS</span><span>PAJAMOS</span></div>
        <div className="instructor-report-list">{instructorReports.map(item=><button key={item.name} onClick={()=>showNotice(`${item.name} rezultatų detalizavimas atidarytas`)}><span className="instructor-report-person"><i style={{background:item.color}}>{item.initials}</i><span><strong>{item.name}</strong><small>{item.hours} val.</small></span></span><span><strong>{item.lessons}</strong><small>pamokų</small></span><span className="occupancy-cell"><strong>{item.occupancy}%</strong><i><em style={{width:`${item.occupancy}%`,background:item.color}}/></i></span><span><strong>★ {item.rating}</strong><small>iš 5,0</small></span><span><strong>{item.revenue}</strong><Icon name="chevron" size={14}/></span></button>)}</div>
      </section>

      <aside className="panel saved-reports-card">
        <div className="report-card-head"><div><h2>Paruoštos ataskaitos</h2><p>Dažniausiai naudojami šablonai</p></div></div>
        <div className="saved-report-list">{[
          {title:"Mėnesio veiklos suvestinė",meta:"Finansai, mokiniai ir pamokos",tone:"red"},
          {title:"Skolų ir mokėjimų sąrašas",meta:"18 neapmokėtų įrašų",tone:"green"},
          {title:"Mokinių pažangos ataskaita",meta:"Kategorijos ir instruktoriai",tone:"blue"},
          {title:"Dokumentų atitikties ataskaita",meta:"9 įrašams reikia dėmesio",tone:"amber"},
        ].map(report=><button key={report.title} onClick={()=>runExport("PDF",report.title)}><span className={`saved-report-icon ${report.tone}`}><Icon name="file" size={17}/></span><span><strong>{report.title}</strong><small>{report.meta}</small></span><Icon name="download" size={15}/></button>)}</div>
        <button className="scheduled-report" onClick={()=>showNotice("Savaitinė ataskaita bus siunčiama pirmadieniais 08:00")}><span>✦</span><div><strong>Automatinė savaitės suvestinė</strong><small>Pirmadieniais, 08:00 · administracijai</small></div><i className="mini-toggle active"/></button>
      </aside>
    </div>

    {exportOpen&&<div className="modal-layer" role="dialog" aria-modal="true" aria-label="Eksportuoti ataskaitą"><button className="modal-scrim" onClick={()=>setExportOpen(false)} aria-label="Uždaryti"/><div className="modal-card report-export-modal"><div className="modal-head"><div><span>ATASKAITOS EKSPORTAS</span><h2>Paruošti failą</h2></div><button className="icon-button" onClick={()=>setExportOpen(false)} aria-label="Uždaryti"><Icon name="close"/></button></div><div className="export-summary"><span><Icon name="chart"/></span><div><small>Pasirinkta ataskaita</small><strong>{reportTab}</strong><p>{period} · {branch}</p></div></div><h3>Pasirinkite formatą</h3><div className="export-format-grid"><button onClick={()=>runExport("PDF")} disabled={!!exporting}><b>PDF</b><span><strong>PDF dokumentas</strong><small>Patogu peržiūrėti ir siųsti</small></span>{exporting==="PDF"?<i className="export-spinner"/>:<Icon name="download" size={16}/>}</button><button onClick={()=>runExport("Excel")} disabled={!!exporting}><b>XLS</b><span><strong>Excel lentelė</strong><small>Duomenų analizei ir filtravimui</small></span>{exporting==="Excel"?<i className="export-spinner"/>:<Icon name="download" size={16}/>}</button></div><label className="export-email"><input type="checkbox" defaultChecked/><span><strong>Išsiųsti kopiją el. paštu</strong><small>asta.juzume@prodivi.lt</small></span></label></div></div>}
  </div>;
}

function ModulePlaceholder({ title, role, onBack, onAction }: { title:string; role:Role; onBack:()=>void; onAction:()=>void }) {
  return <div className="module-page"><button className="back-link" onClick={onBack}>← Grįžti į apžvalgą</button><PageHeading eyebrow={roleLabels[role].toUpperCase()} title={title} text="Interaktyvi modulio peržiūra. Pilnas turinys bus detalizuojamas kitame etape." action={<button className="primary-button standalone" onClick={onAction}><Icon name="plus" size={18}/>Naujas įrašas</button>}/><section className="panel module-panel"><div className="empty-illustration"><span><Icon name={title === "Kalendorius" ? "calendar" : title === "Mokiniai" ? "users" : title === "Transportas" ? "car" : "file"} size={32}/></span></div><h2>{title} modulis paruoštas plėtrai</h2><p>Šiame prototipe navigacija jau veikia. Pasakykite, kokius laukus ir veiksmus norite matyti šiame modulyje, ir jį išplėsime.</p><button className="secondary-button" onClick={onBack}>Peržiūrėti apžvalgą</button></section></div>;
}

function ActionModal({ type, role, onClose, onSave }: { type:"lesson"|"student"; role:Role; onClose:()=>void; onSave:()=>void }) {
  const [step, setStep] = useState(1);
  const [paymentPlan,setPaymentPlan]=useState<"deposit"|"full">("deposit");
  const [paymentState,setPaymentState]=useState<"idle"|"processing"|"success">("idle");
  const paymentAmount=paymentPlan==="deposit"?200:450;
  function processPayment(){
    setPaymentState("processing");
    window.setTimeout(()=>setPaymentState("success"),900);
  }
  return <div className="modal-layer" role="dialog" aria-modal="true" aria-label={type === "student" ? "Naujo mokinio registracija" : "Važiavimo rezervacija"}>
    <button className="modal-scrim" onClick={onClose} aria-label="Uždaryti"/>
    <div className={`modal-card ${type==="student"?"student-registration-modal":""}`}>
      <div className="modal-head"><div><span>{type === "student" ? "NAUJA REGISTRACIJA" : "NAUJAS VAŽIAVIMAS"}</span><h2>{type === "student" ? step===1?"Registruoti mokinį":step===2?"Sutartis ir sutikimai":"Apmokėjimas":"Rezervuoti važiavimą"}</h2></div><button className="icon-button" onClick={onClose} aria-label="Uždaryti"><Icon name="close"/></button></div>
      {type === "student" ? <>
        <div className="registration-steps"><span className="active"><i>1</i><em>Informacija</em></span><b className={step>=2?"active":""}/><span className={step>=2?"active":""}><i>2</i><em>Sutartis</em></span><b className={step>=3?"active":""}/><span className={step>=3?"active":""}><i>3</i><em>Apmokėjimas</em></span></div>
        {step===1&&<div className="form-grid"><label><span>Vardas</span><input defaultValue="Eglė"/></label><label><span>Pavardė</span><input defaultValue="Kazlauskaitė"/></label><label className="wide"><span>El. paštas</span><input type="email" defaultValue="egle@email.lt"/></label><label><span>Telefono numeris</span><input defaultValue="+370 612 34 567"/></label><label><span>Filialas</span><select><option>Centro skyrius</option><option>Šiaurės skyrius</option></select></label><label><span>Kategorija</span><select defaultValue="B"><option>B</option><option>B · automatas</option><option>A2</option><option>C</option><option>CE</option><option>D</option></select></label><label><span>Automobilis</span><select><option>Toyota Corolla · automatas</option><option>VW Golf · mechaninė</option></select></label></div>}
        {step===2&&<div className="registration-contract-step"><div className="registration-summary"><span className="student-avatar" style={{background:"#e73f49"}}>EK</span><div><small>REGISTRUOJAMAS MOKINYS</small><strong>Eglė Kazlauskaitė</strong><p>B kategorija · Toyota Corolla · 450 €</p></div><i><Icon name="check" size={14}/></i></div><div className="registration-contract-preview"><span><Icon name="file" size={20}/></span><div><small>SUTARTIS SUGENERUOTA AUTOMATIŠKAI</small><strong>B kategorijos mokymo sutartis</strong><p>Duomenys užpildyti iš registracijos anketos · 4 puslapiai</p></div><button onClick={()=>setPaymentState("idle")}>Peržiūrėti</button></div><div className="registration-consents"><label><input type="checkbox" defaultChecked/><span><strong>Susipažinau su mokymo sutartimi</strong><small>Sutinku su mokymo sąlygomis ir vidaus taisyklėmis.</small></span></label><label><input type="checkbox" defaultChecked/><span><strong>Sutinku su asmens duomenų tvarkymu</strong><small>Duomenys bus naudojami mokymo paslaugoms administruoti.</small></span></label></div><div className="signature-box"><span>Mokinio parašas planšetės ekrane</span><div>Eglė Kazlauskaitė</div></div></div>}
        {step===3&&<div className="registration-payment-step">{paymentState!=="success"?<><div className="payment-choice"><div><strong>Pasirinkite mokėjimo dydį</strong><span>Kurso kaina – 450 €</span></div><div><button className={paymentPlan==="deposit"?"active":""} onClick={()=>setPaymentPlan("deposit")}><span>Pradinis mokėjimas</span><strong>200 €</strong><small>Likutis vėliau – 250 €</small><i>{paymentPlan==="deposit"&&<Icon name="check" size={13}/>}</i></button><button className={paymentPlan==="full"?"active":""} onClick={()=>setPaymentPlan("full")}><span>Visa kurso suma</span><strong>450 €</strong><small>Apmokama iš karto</small><i>{paymentPlan==="full"&&<Icon name="check" size={13}/>}</i></button></div></div><div className="stripe-checkout"><div className="stripe-checkout-head"><div><span>Saugus mokėjimas</span><small>Kortelės duomenys nebus saugomi mokykloje</small></div><strong>stripe</strong></div><label className="stripe-card-field"><span>Kortelės numeris</span><div><Icon name="card" size={18}/><input defaultValue="4242 4242 4242 4242" aria-label="Kortelės numeris"/><em>VISA</em></div></label><div className="stripe-fields-row"><label><span>Galioja iki</span><input defaultValue="12 / 29" aria-label="Kortelės galiojimas"/></label><label><span>CVC</span><input defaultValue="123" aria-label="CVC"/></label></div><label className="stripe-cardholder"><span>Kortelės savininkas</span><input defaultValue="EGLĖ KAZLAUSKAITĖ"/></label><button className="stripe-pay-button" disabled={paymentState==="processing"} onClick={processPayment}>{paymentState==="processing"?<><i className="payment-spinner"/>Mokėjimas tikrinamas...</>:<><Icon name="shield" size={17}/>Apmokėti {paymentAmount} €</>}</button><p><Icon name="shield" size={13}/> Mokėjimą saugiai apdoroja „Stripe“. Tai demonstracinis režimas – pinigai nenuskaičiuojami.</p></div></>:<div className="payment-success"><span><Icon name="check" size={27}/></span><h3>Mokėjimas sėkmingas</h3><p>Registracijos mokestis gautas ir mokinio finansų kortelė atnaujinta.</p><div><span><small>Apmokėta</small><strong>{paymentAmount} €</strong></span><span><small>Mokėjimo būdas</small><strong>Visa ···· 4242</strong></span><span><small>Operacijos Nr.</small><strong>pi_demo_0721</strong></span></div><section><strong>Atlikta automatiškai</strong><span><Icon name="check" size={14}/> Sukurtas mokinio finansinis įrašas</span><span><Icon name="check" size={14}/> Kvitas išsiųstas el. paštu</span><span><Icon name="check" size={14}/> Sutartis pažymėta kaip apmokėta</span></section></div>}</div>}
      </> : <><div className="form-grid"><label className="wide"><span>Mokinys</span><select><option>{role === "student" ? "Lukas Petrauskas" : "Gabija Jankauskaitė"}</option><option>Mantas Žukauskas</option></select></label><label><span>Data</span><input type="date" defaultValue="2026-07-21"/></label><label><span>Laikas</span><select><option>09:00–10:30</option><option>14:00–15:30</option><option>16:00–17:30</option></select></label><label className="wide"><span>Instruktorius</span><select><option>Darius Siudikas · Toyota Corolla</option><option>Vesta Jankauskienė · VW Golf</option></select></label></div><div className="availability"><span><Icon name="check" size={16}/></span><div><strong>Laikas laisvas</strong><p>Pasirinktas instruktorius ir automobilis yra laisvi.</p></div></div></>}
      <div className="modal-actions"><button className="secondary-button" onClick={type==="student"&&step>1?()=>{setStep(step-1);setPaymentState("idle")}:onClose}>{type==="student"&&step>1?"Atgal":"Atšaukti"}</button>{type==="student"?<>{step<3&&<button className="primary-button" onClick={()=>setStep(step+1)}>{step===1?"Toliau":"Toliau į apmokėjimą"} <Icon name="arrow" size={17}/></button>}{step===3&&paymentState==="success"&&<button className="primary-button" onClick={onSave}><Icon name="check" size={17}/>Baigti registraciją</button>}</>:<button className="primary-button" onClick={onSave}><Icon name="check" size={17}/>Rezervuoti</button>}</div>
    </div>
  </div>;
}
