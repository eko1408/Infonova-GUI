import React, { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Phone, Globe, User, CalendarDays, Receipt, Boxes, Paperclip, ShieldCheck, Users, History, Layout } from "lucide-react";

/**
 * Webseiten-Mockup (statisch) für TMF651 Agreement – Max Mustermann
 * - Umfasst alle in der vorherigen Liste genannten Bereiche:
 *   Header, Parteien, Items, Klauseln, Dokumente, Erweiterungen, Vorlage (Specification), Historie
 * - PLUS: Gebühren-Tab mit Positionen (MRC/OTC/Usage/Credit) und Summen (Netto/Steuer/Brutto)
 * - Keine API-Calls: alle Daten liegen im Mock-Objekt unten
 * - Agentenfreundlich: semantische Tabellen, aria-busy, data-testid
 */

const agreement = {
  id: "AGR-2025-000123",
  href: "/tmf-api/agreement/v4/agreements/AGR-2025-000123",
  name: "Office Fast Secure+ – Vertrag Max Mustermann",
  status: "active",
  effectivePeriod: { startDateTime: "2025-03-26T00:00:00Z", endDateTime: "2028-03-25T23:59:59Z" },
  agreementSpecification: { id: "AGRSPEC-B2B-ACCESS-VOICE", name: "B2B Access + Voice", version: "1.2", validFor: { start: "2024-01-01", end: "2026-12-31" } },
  engagedParty: [
    { id: "CUST-0001", role: "customer", name: "Max Mustermann" },
    { id: "SP-0001", role: "provider", name: "Beispiel Telco GmbH" }
  ],
  relatedParty: [
    { id: "CUST-0001", role: "payer", name: "Max Mustermann" },
    { id: "U-007", role: "accountManager", name: "Erika Beispiel" }
  ],
  agreementItem: [
    {
      id: "AI-1",
      name: "Office Fast Secure+ (Internet)",
      description: "Internet 1000 Mbit/s inkl. Router",
      product: {
        productOffering: { id: "PO-OFSP-1000", name: "Office Fast Secure+" },
        productSpecification: { id: "PS-ACCESS-FTTH-1G", name: "Business Internet 1 Gbit/s" },
        productCharacteristic: [
          { name: "AccessType", value: "Internet" },
          { name: "Downstream", value: "1000 Mbit/s" },
          { name: "RouterIncluded", value: true }
        ]
      }
    },
    {
      id: "AI-2",
      name: "Voice (2 Kanäle, 3 Rufnummern)",
      description: "SIP Trunk mit 2 Kanälen und 3 DDI",
      product: {
        productOffering: { id: "PO-VOICE-2CH", name: "Business Voice 2 Channels" },
        productSpecification: { id: "PS-VOICE-SIP", name: "SIP Voice Trunk" },
        productCharacteristic: [
          { name: "VoiceChannels", value: 2 },
          { name: "DDIs", value: ["02023097712", "02023097713", "02023097714"] }
        ]
      }
    }
  ],
  terms: [
    { id: "TERM-1", name: "Mindestvertragslaufzeit", description: "36 Monate ab Vertragsbeginn", validFor: { start: "2025-03-26", end: "2028-03-25" }, characteristic: [{ name: "MinimumTermMonths", value: 36 }] },
    { id: "TERM-2", name: "SLA", description: "Verfügbarkeit 99,9% / Monat", validFor: { start: "2025-03-26", end: "2028-03-25" } }
  ],
  attachment: [
    { id: "ATT-1", name: "Vertrag (PDF)", url: "https://dms.example/agreements/AGR-2025-000123.pdf", mimeType: "application/pdf", lastModified: "2025-03-26" },
    { id: "ATT-2", name: "Nachtrag Router", url: "https://dms.example/agreements/AGR-2025-000123-annex.pdf", mimeType: "application/pdf", lastModified: "2025-03-26" }
  ],
  characteristic: [
    { name: "ContractType", value: "B2B" },
    { name: "Jurisdiction", value: "DE" },
    { name: "CostCenter", value: "4711" }
  ],
  customer: { name: "Max Mustermann", phone: "0123/4567891", address: "Musterstrasse 1, 12345 Musterstadt" },
  provider: "Beispiel Telco GmbH",
  billing: {
    currency: "EUR",
    taxPercent: 19,
    period: { start: "2025-09-01", end: "2025-09-30" },
    charges: [
      { id: "CH-1", type: "recurring", name: "Internet MRC (Office Fast Secure+)", reference: "AI-1", quantity: 1, unit: "month", unitPrice: 79.90 },
      { id: "CH-2", type: "recurring", name: "Voice MRC (2 Kanäle)", reference: "AI-2", quantity: 1, unit: "month", unitPrice: 29.90 },
      { id: "CH-3", type: "recurring", name: "Rufnummern-Paket (3 DDIs)", reference: "AI-2", quantity: 3, unit: "num", unitPrice: 2.00 },
      { id: "CH-4", type: "recurring", name: "Router-Bereitstellung (Miete)", reference: "AI-1", quantity: 1, unit: "month", unitPrice: 5.00 },
      { id: "CH-5", type: "credit", name: "Promorabatt", reference: "AGR-2025-000123", quantity: 1, unit: "month", unitPrice: -10.00 }
    ],
    bills: [
      { id: "CB-2025-09-0001", billNo: "INV-2025-09-0001", billDate: "2025-09-30", state: "issued", billingPeriod: { start: "2025-09-01", end: "2025-09-30" }, amountDue: 129.80, currency: "EUR", paymentDueDate: "2025-10-14" },
      { id: "CB-2025-08-0001", billNo: "INV-2025-08-0001", billDate: "2025-08-31", state: "settled", billingPeriod: { start: "2025-08-01", end: "2025-08-31" }, amountDue: 129.80, currency: "EUR", paymentDueDate: "2025-09-14" }
    ],
    payments: [
      { id: "PAY-2025-09-1001", date: "2025-09-10", amount: 129.80, currency: "EUR", method: "SEPA-Lastschrift", billRef: "INV-2025-08-0001" }
    ]
  }
};

const agreement2 = {
  ...agreement,
  id: "AGR-2024-000777",
  name: "Office Fast Secure+ – Zusatzstandort",
  status: "suspended",
  effectivePeriod: { startDateTime: "2024-05-01T00:00:00Z", endDateTime: "2027-04-30T23:59:59Z" },
  billing: {
    ...agreement.billing,
    period: { start: "2025-09-01", end: "2025-09-30" },
    charges: [
      { id: "CH-1b", type: "recurring", name: "Internet MRC (Zusatzstandort)", reference: "AI-1", quantity: 1, unit: "month", unitPrice: 59.90 },
      { id: "CH-2b", type: "credit", name: "Kulanzgutschrift", reference: "AGR-2024-000777", quantity: 1, unit: "month", unitPrice: -20.00 }
    ],
    bills: [
      { id: "CB-2025-09-0701", billNo: "INV-2025-09-0701", billDate: "2025-09-30", state: "issued", billingPeriod: { start: "2025-09-01", end: "2025-09-30" }, amountDue: 47.88, currency: "EUR", paymentDueDate: "2025-10-14" }
    ],
    payments: []
  }
};

const agreements = [agreement, agreement2];

function EntrySite({ agreements, onOpen }: { agreements: any[]; onOpen: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const filtered = useMemo(() => {
    return agreements.filter(a => {
      const q = query.trim().toLowerCase();
      const matchesQ = !q || a.id.toLowerCase().includes(q) || a.name.toLowerCase().includes(q);
      const matchesS = status === "all" || (a.status || "").toLowerCase() === status;
      return matchesQ && matchesS;
    });
  }, [agreements, query, status]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        
        <div>
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2"><Layout className="h-6 w-6"/>Vertragsübersicht – Einstieg</h1>
          <p className="text-sm text-muted-foreground">Kunde: Max Mustermann – {agreements.length} Verträge</p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Suche nach ID oder Name…" value={query} onChange={(e) => setQuery(e.target.value)} className="w-64" />
          <select className="border rounded-md px-2 py-2 text-sm" value={status} onChange={(e)=>setStatus(e.target.value)} aria-label="Status filtern">
            <option value="all">Alle Status</option>
            <option value="active">active</option>
            <option value="suspended">suspended</option>
            <option value="draft">draft</option>
          </select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0" role="table" aria-busy={false} data-testid="tbl-agreements">
              <thead className="bg-gray-100" role="rowgroup">
                <tr role="row">
                  <Th>Vertrag</Th>
                  <Th>Status</Th>
                  <Th>Laufzeit</Th>
                  <Th>Produkte (Kurz)</Th>
                  <Th className="text-right">Ø Monat (netto)</Th>
                  <Th>Aktion</Th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {filtered.map(a => {
                  const sums = calcTotals(a.billing.charges, a.billing.taxPercent);
                  return (
                    <tr key={a.id} role="row" className="hover:bg-gray-50">
                      <Td>
                        <div className="font-medium">{a.name}</div>
                        <div className="text-xs text-muted-foreground">{a.id}</div>
                      </Td>
                      <Td><StatusBadge value={a.status}/></Td>
                      <Td>{fmtDate(a.effectivePeriod.startDateTime)} – {fmtDate(a.effectivePeriod.endDateTime)}</Td>
                      <Td className="text-sm text-muted-foreground">{a.agreementItem.map((it:any)=>it.name).join(" • ")}</Td>
                      <Td className="text-right">{toCurrency(sums.net, a.billing.currency)}</Td>
                      <Td>
                        <Button size="sm" className="gap-2" onClick={()=>onOpen(a.id)}><FileText className="h-4 w-4"/>Öffnen</Button>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AgreementDetail({ agreement, onBack }: { agreement: any, onBack?: () => void }) {
  const sums = calcTotals(agreement.billing.charges, agreement.billing.taxPercent);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Seitenkopf */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          {onBack && <Button variant="outline" onClick={onBack} className="gap-2" data-testid="btn-back">Zur Übersicht</Button>}
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2"><Layout className="h-6 w-6"/>Vertragsübersicht (Mockup)</h1>
          <p className="text-sm text-muted-foreground w-full">TMF651 – Agreement • Max Mustermann</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" data-testid="btn-pdf"><FileText className="h-4 w-4"/> Vertrag (PDF)</Button>
          <Button variant="outline" className="gap-2" data-testid="btn-export"><Download className="h-4 w-4"/> Export</Button>
        </div>
      </div>

      {/* Agreement Header */}
      <Card className="mb-6" aria-label="Agreement Header">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <InfoTile icon={<FileText className="h-5 w-5"/>} label="Vertrag" value={agreement.id} />
            <InfoTile icon={<CalendarDays className="h-5 w-5"/>} label="Laufzeit" value={`${fmtDate(agreement.effectivePeriod.startDateTime)} – ${fmtDate(agreement.effectivePeriod.endDateTime)}`} />
            <InfoTile icon={<User className="h-5 w-5"/>} label="Kunde" value={agreement.customer.name} />
            <InfoTile icon={<Boxes className="h-5 w-5"/>} label="Status" value={<StatusBadge value={agreement.status}/>} />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <SubInfo label="Adresse" value={agreement.customer.address} />
            <SubInfo label="Telefon" value={agreement.customer.phone} />
            <SubInfo label="Anbieter" value={agreement.provider} />
          </div>
        </CardContent>
      </Card>

      {/* Tabs komplett */}
      <Tabs defaultValue="items">
        <TabsList className="mb-3">
          <TabsTrigger value="items" className="gap-2"><Boxes className="h-4 w-4"/>Positionen</TabsTrigger>
          <TabsTrigger value="billing" className="gap-2"><Receipt className="h-4 w-4"/>Gebühren & Billing</TabsTrigger>
          <TabsTrigger value="parties" className="gap-2"><Users className="h-4 w-4"/>Parteien</TabsTrigger>
          <TabsTrigger value="terms" className="gap-2"><ShieldCheck className="h-4 w-4"/>Klauseln</TabsTrigger>
          <TabsTrigger value="attachments" className="gap-2"><Paperclip className="h-4 w-4"/>Dokumente</TabsTrigger>
          <TabsTrigger value="characteristics" className="gap-2"><Globe className="h-4 w-4"/>Erweiterungen</TabsTrigger>
          <TabsTrigger value="spec" className="gap-2"><FileText className="h-4 w-4"/>Vorlage</TabsTrigger>
          <TabsTrigger value="history" className="gap-2"><History className="h-4 w-4"/>Historie</TabsTrigger>
        </TabsList>

        {/* Items */}
        <TabsContent value="items">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-0" role="table" aria-busy={false} data-testid="tbl-items">
                  <thead className="bg-gray-100" role="rowgroup">
                    <tr role="row">
                      <Th>Item-ID</Th>
                      <Th>Name</Th>
                      <Th>Beschreibung</Th>
                      <Th>Merkmale</Th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {agreement.agreementItem.map((it) => (
                      <tr key={it.id} role="row" className="hover:bg-gray-50">
                        <Td>{it.id}</Td>
                        <Td>{it.name}</Td>
                        <Td className="text-sm text-muted-foreground">{it.description}</Td>
                        <Td>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {(it.product.productCharacteristic||[]).map(c => (
                              <span key={c.name} className="rounded-full bg-gray-100 px-2 py-0.5">{c.name}: {renderVal(c.value)}</span>
                            ))}
                          </div>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing">
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="text-sm text-muted-foreground mb-2">Abrechnungszeitraum: {agreement.billing.period.start} – {agreement.billing.period.end}</div>
                {/* Charges table */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-separate border-spacing-0" role="table" aria-busy={false} data-testid="tbl-charges">
                    <thead className="bg-gray-100" role="rowgroup">
                      <tr role="row">
                        <Th>Position</Th>
                        <Th>Art</Th>
                        <Th>Bezug</Th>
                        <Th className="text-right">Menge</Th>
                        <Th>Einheit</Th>
                        <Th className="text-right">Einzelpreis</Th>
                        <Th className="text-right">Betrag</Th>
                      </tr>
                    </thead>
                    <tbody role="rowgroup">
                      {agreement.billing.charges.map(ch => (
                        <tr key={ch.id} role="row" className="hover:bg-gray-50">
                          <Td>{ch.name}</Td>
                          <Td>{mapType(ch.type)}</Td>
                          <Td><Badge variant="outline">{ch.reference}</Badge></Td>
                          <Td className="text-right">{ch.quantity}</Td>
                          <Td>{ch.unit}</Td>
                          <Td className="text-right">{toCurrency(ch.unitPrice, agreement.billing.currency)}</Td>
                          <Td className="text-right">{toCurrency(ch.quantity * ch.unitPrice, agreement.billing.currency)}</Td>
                        </tr>
                      ))}
                      {/* Totals */}
                      <tr role="row">
                        <Td colSpan={6} className="text-right font-medium">Zwischensumme (netto)</Td>
                        <Td className="text-right font-medium">{toCurrency(sums.net, agreement.billing.currency)}</Td>
                      </tr>
                      <tr role="row">
                        <Td colSpan={6} className="text-right">Steuer ({agreement.billing.taxPercent}%)</Td>
                        <Td className="text-right">{toCurrency(sums.tax, agreement.billing.currency)}</Td>
                      </tr>
                      <tr role="row" className="bg-gray-50">
                        <Td colSpan={6} className="text-right font-semibold">Gesamt (brutto)</Td>
                        <Td className="text-right font-semibold">{toCurrency(sums.gross, agreement.billing.currency)}</Td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Bills table */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-separate border-spacing-0" role="table" aria-busy={false} data-testid="tbl-bills">
                    <thead className="bg-gray-100" role="rowgroup">
                      <tr role="row">
                        <Th>Rechnungsnr.</Th>
                        <Th>Zeitraum</Th>
                        <Th>Datum</Th>
                        <Th>Status</Th>
                        <Th>Fällig bis</Th>
                        <Th className="text-right">Betrag fällig</Th>
                      </tr>
                    </thead>
                    <tbody role="rowgroup">
                      {agreement.billing.bills.map(b => (
                        <tr key={b.id} role="row" className="hover:bg-gray-50">
                          <Td>{b.billNo}</Td>
                          <Td>{b.billingPeriod.start} – {b.billingPeriod.end}</Td>
                          <Td>{b.billDate}</Td>
                          <Td><StatusBadge value={b.state}/></Td>
                          <Td>{b.paymentDueDate || "—"}</Td>
                          <Td className="text-right">{toCurrency(b.amountDue, b.currency)}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Payments table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-separate border-spacing-0" role="table" aria-busy={false} data-testid="tbl-payments">
                    <thead className="bg-gray-100" role="rowgroup">
                      <tr role="row">
                        <Th>Zahlungsdatum</Th>
                        <Th>Methode</Th>
                        <Th>Bezug (Rechnung)</Th>
                        <Th className="text-right">Betrag</Th>
                      </tr>
                    </thead>
                    <tbody role="rowgroup">
                      {agreement.billing.payments.map(p => (
                        <tr key={p.id} role="row" className="hover:bg-gray-50">
                          <Td>{p.date}</Td>
                          <Td>{p.method}</Td>
                          <Td><Badge variant="outline">{p.billRef}</Badge></Td>
                          <Td className="text-right">{toCurrency(p.amount, p.currency)}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parties */}
        <TabsContent value="parties">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-0" role="table" aria-busy={false} data-testid="tbl-parties">
                  <thead className="bg-gray-100" role="rowgroup">
                    <tr role="row">
                      <Th>Rolle</Th>
                      <Th>Name</Th>
                      <Th>Typ</Th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {agreement.engagedParty.map(p => (
                      <tr key={`engaged-${p.id}`} role="row" className="hover:bg-gray-50">
                        <Td>{p.role}</Td>
                        <Td>{p.name}</Td>
                        <Td><Badge>engaged</Badge></Td>
                      </tr>
                    ))}
                    {agreement.relatedParty.map(p => (
                      <tr key={`related-${p.id}-${p.role}`} role="row" className="hover:bg-gray-50">
                        <Td>{p.role}</Td>
                        <Td>{p.name}</Td>
                        <Td><Badge variant="outline">related</Badge></Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Terms / Clauses */}
        <TabsContent value="terms">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-0" role="table" aria-busy={false} data-testid="tbl-terms">
                  <thead className="bg-gray-100" role="rowgroup">
                    <tr role="row">
                      <Th>Klausel</Th>
                      <Th>Beschreibung</Th>
                      <Th>Gültig</Th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {agreement.terms.map(t => (
                      <tr key={t.id} role="row" className="hover:bg-gray-50">
                        <Td>{t.name}</Td>
                        <Td className="text-sm text-muted-foreground">{t.description || "—"}</Td>
                        <Td>{t.validFor?.start} – {t.validFor?.end}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attachments */}
        <TabsContent value="attachments">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-0" role="table" aria-busy={false} data-testid="tbl-attachments">
                  <thead className="bg-gray-100" role="rowgroup">
                    <tr role="row">
                      <Th>Datei</Th>
                      <Th>Typ</Th>
                      <Th>Geändert</Th>
                      <Th>Aktion</Th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {agreement.attachment.map(a => (
                      <tr key={a.id} role="row" className="hover:bg-gray-50">
                        <Td>{a.name}</Td>
                        <Td>{a.mimeType}</Td>
                        <Td>{a.lastModified}</Td>
                        <Td>
                          <Button variant="outline" size="sm" className="gap-2"><FileText className="h-4 w-4"/>Öffnen</Button>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Characteristics */}
        <TabsContent value="characteristics">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2" data-testid="chips-characteristics">
                {agreement.characteristic.map(c => (
                  <span key={c.name} className="rounded-full bg-gray-100 px-3 py-1 text-xs">{c.name}: {String(c.value)}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Specification */}
        <TabsContent value="spec">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <SubInfo label="Vorlage" value={`${agreement.agreementSpecification.name}`} />
                <SubInfo label="Version" value={`${agreement.agreementSpecification.version}`} />
                <SubInfo label="Gültig" value={`${agreement.agreementSpecification.validFor.start} – ${agreement.agreementSpecification.validFor.end}`} />
                <SubInfo label="Spec-ID" value={`${agreement.agreementSpecification.id}`} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Die Specification definiert Struktur & Regeln für diesen Vertragstyp. Neue Verträge sollten stets auf die aktuelle Version verweisen.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History (Mock) */}
        <TabsContent value="history">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-0" role="table" aria-busy={false} data-testid="tbl-history">
                  <thead className="bg-gray-100" role="rowgroup">
                    <tr role="row">
                      <Th>Zeit</Th>
                      <Th>Ereignis</Th>
                      <Th>Benutzer/System</Th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    <tr role="row" className="hover:bg-gray-50">
                      <Td>2025-03-26 10:12</Td>
                      <Td>Agreement erstellt</Td>
                      <Td>system</Td>
                    </tr>
                    <tr role="row" className="hover:bg-gray-50">
                      <Td>2025-03-26 10:13</Td>
                      <Td>PDF angehängt</Td>
                      <Td>erika.beispiel</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-white p-3">
      <div className="rounded-xl bg-gray-100 p-2">{icon}</div>
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function SubInfo({ label, value }: { label: string, value: string }) {
  return (
    <div className="rounded-2xl bg-gray-100 px-3 py-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

function StatusBadge({ value }: { value: string }) {
  const v = (value||"").toLowerCase();
  const variant = v === "active" ? "bg-green-100 text-green-800" : v === "draft" ? "bg-yellow-100 text-yellow-800" : v === "suspended" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800";
  return <span className={`rounded-full px-2 py-0.5 text-xs ${variant}`}>{value}</span>;
}

function Th({ children }: { children: React.ReactNode }) {
  return <th role="columnheader" className="sticky top-0 z-10 border-b p-2 text-left text-xs font-semibold text-muted-foreground">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td role="cell" className="border-b p-2 text-sm">{children}</td>;
}

function fmtDate(iso?: string) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" });
  } catch {
    return iso;
  }
}

function renderVal(v: any) {
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "boolean") return v ? "Ja" : "Nein";
  return String(v);
}

function toCurrency(v: number, currency = "EUR") {
  try { return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(v); } catch { return String(v); }
}

function mapType(t: string) {
  const m: Record<string,string> = { recurring: "wiederkehrend", oneTime: "einmalig", usage: "verbrauch", credit: "Gutschrift", penalty: "Strafe" };
  return m[t] || t;
}

function calcTotals(charges: Array<{quantity:number; unitPrice:number;}>, taxPercent: number) {
  const net = charges.reduce((s, c) => s + c.quantity * c.unitPrice, 0);
  const tax = +(net * (taxPercent/100)).toFixed(2);
  const gross = +(net + tax).toFixed(2);
  return { net, tax, gross };
}

export default function App(){
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const openAgreement = (id: string) => setSelectedId(id);
  const back = () => setSelectedId(null);
  const selected = useMemo(()=> agreements.find(a=>a.id===selectedId) || null, [selectedId]);

  if(!selected){
    return <EntrySite agreements={agreements} onOpen={openAgreement}/>;
  }
  return <AgreementDetail agreement={selected} onBack={back}/>;
}
