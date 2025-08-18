import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PersonalFormData, JointFormData } from "@/types/form"
import SignatureField from "../signature"
import { CollapsibleSection } from "../collapsible-section"
import { CreditCard, PenTool, User } from "lucide-react"

interface FormErrors {
  [key: string]: string
}

export default function JointForm() {

    const [jointSections, setJointSections] = useState({
        accountType: true,
        holder1: false,
        holder2: false,
        accounts: false,
        signatures: false,
    })

    const [jointData, setJointData] = useState<JointFormData>({
        accountType: "",
        holder1Name: "",
        holder1Phone: "",
        holder1Niu: "",
        holder1Email: "",
        holder1Address: "",
        holder1Profession: "",
        holder1Employer: "",
        holder1IdNumber: "",
        holder1IdIssuer: "",
        holder1IdDate: "",
        holder2Name: "",
        holder2Phone: "",
        holder2Niu: "",
        holder2Email: "",
        holder2Address: "",
        holder2Profession: "",
        holder2Employer: "",
        holder2IdNumber: "",
        holder2IdIssuer: "",
        holder2IdDate: "",
        signatureType: "",
        accountEpargne: false,
        accountCourant: false,
        accountNDjangui: false,
        accountCheque: false,
        accountPlacement: false,
        signature1: "",
        signature2: "",
        declaration: false,
        terms1Accepted: false,
        terms2Accepted: false,
    })
    
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const signatureRef1 = useRef<HTMLCanvasElement>(null)
    const signatureRef2 = useRef<HTMLCanvasElement>(null)
    const signatureRef3 = useRef<HTMLCanvasElement>(null)

    const handleJointInputChange = (field: keyof JointFormData, value: string | boolean | number) => {
        setJointData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const validateJointForm = (): boolean => {
        const newErrors: FormErrors = {}
    
        if (!jointData.accountType) newErrors.accountType = "Type de compte requis"
        if (!jointData.holder1Name.trim()) newErrors.holder1Name = "Nom du cotitulaire 1 requis"
        if (!jointData.holder2Name.trim()) newErrors.holder2Name = "Nom du cotitulaire 2 requis"
        if (!jointData.signatureType) newErrors.signatureType = "Type de signature requis"
        if (!jointData.declaration) newErrors.declaration = "Déclaration requise"
    
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
      }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
    
        const isValid = validateJointForm()
    
        if (!isValid) {
          setIsSubmitting(false)
          return
        }
    
        const formData = jointData
        console.log(`${"Joint"} Account Registration:`, formData)
    
        setTimeout(() => {
          setIsSubmitting(false)
          alert("Demande d'ouverture de compte soumise avec succès!")
        }, 1000)
    }
    
    const maritalStatusOptions = [
        { value: "celibataire", label: "Célibataire" },
        { value: "marie", label: "Marié(e)" },
        { value: "divorce", label: "Divorcé(e)" },
        { value: "veuf", label: "Veuf/Veuve" },
    ]

    const toggleJointSection = (section: keyof typeof jointSections) => {
        setJointSections((prev) => ({ ...prev, [section]: !prev[section] }))
    }
    

    return(
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Type Selection */}
            <CollapsibleSection
              title="Type de Compte Joint"
              icon={<CreditCard className="h-5 w-5 text-blue-600" />}
              isOpen={jointSections.accountType}
              onToggle={() => toggleJointSection("accountType")}
              required
            >
              <RadioGroup
                value={jointData.accountType}
                onValueChange={(value) => handleJointInputChange("accountType", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="indivis" id="account-indivis" />
                  <div>
                    <Label htmlFor="account-indivis" className="cursor-pointer font-medium">
                      Compte Indivis (ET)
                    </Label>
                    <p className="text-sm text-gray-600">Les deux titulaires doivent signer ensemble</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="solidarite" id="account-solidarite" />
                  <div>
                    <Label htmlFor="account-solidarite" className="cursor-pointer font-medium">
                      Solidarité Active et Passive (OU)
                    </Label>
                    <p className="text-sm text-gray-600">Chaque titulaire peut agir seul</p>
                  </div>
                </div>
              </RadioGroup>
              {errors.accountType && <p className="text-sm text-destructive mt-1">{errors.accountType}</p>}
            </CollapsibleSection>

            {/* Cotitulaire 1 */}
            <CollapsibleSection
              title="Cotitulaire 1"
              icon={<User className="h-5 w-5 text-green-600" />}
              isOpen={jointSections.holder1}
              onToggle={() => toggleJointSection("holder1")}
              required
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="holder1Name">Noms et Prénoms *</Label>
                  <Input
                    id="holder1Name"
                    value={jointData.holder1Name}
                    onChange={(e) => handleJointInputChange("holder1Name", e.target.value)}
                    className={errors.holder1Name ? "border-destructive" : ""}
                  />
                  {errors.holder1Name && <p className="text-sm text-destructive mt-1">{errors.holder1Name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="holder1Phone">Téléphone</Label>
                    <Input
                      id="holder1Phone"
                      type="tel"
                      value={jointData.holder1Phone}
                      onChange={(e) => handleJointInputChange("holder1Phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="holder1Niu">NIU</Label>
                    <Input
                      id="holder1Niu"
                      value={jointData.holder1Niu}
                      onChange={(e) => handleJointInputChange("holder1Niu", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="holder1Email">Email</Label>
                  <Input
                    id="holder1Email"
                    type="email"
                    value={jointData.holder1Email}
                    onChange={(e) => handleJointInputChange("holder1Email", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="holder1Address">Adresse</Label>
                  <Input
                    id="holder1Address"
                    value={jointData.holder1Address}
                    onChange={(e) => handleJointInputChange("holder1Address", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="holder1Profession">Profession</Label>
                    <Input
                      id="holder1Profession"
                      value={jointData.holder1Profession}
                      onChange={(e) => handleJointInputChange("holder1Profession", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="holder1Employer">Employeur</Label>
                    <Input
                      id="holder1Employer"
                      value={jointData.holder1Employer}
                      onChange={(e) => handleJointInputChange("holder1Employer", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="holder1IdNumber">N° CNI</Label>
                    <Input
                      id="holder1IdNumber"
                      value={jointData.holder1IdNumber}
                      onChange={(e) => handleJointInputChange("holder1IdNumber", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="holder1IdIssuer">Émetteur</Label>
                    <Input
                      id="holder1IdIssuer"
                      value={jointData.holder1IdIssuer}
                      onChange={(e) => handleJointInputChange("holder1IdIssuer", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="holder1IdDate">Date</Label>
                    <Input
                      id="holder1IdDate"
                      type="date"
                      value={jointData.holder1IdDate}
                      onChange={(e) => handleJointInputChange("holder1IdDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* Cotitulaire 2 */}
            <CollapsibleSection
              title="Cotitulaire 2"
              icon={<User className="h-5 w-5 text-purple-600" />}
              isOpen={jointSections.holder2}
              onToggle={() => toggleJointSection("holder2")}
              required
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="holder2Name">Noms et Prénoms *</Label>
                  <Input
                    id="holder2Name"
                    value={jointData.holder2Name}
                    onChange={(e) => handleJointInputChange("holder2Name", e.target.value)}
                    className={errors.holder2Name ? "border-destructive" : ""}
                  />
                  {errors.holder2Name && <p className="text-sm text-destructive mt-1">{errors.holder2Name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="holder2Phone">Téléphone</Label>
                    <Input
                      id="holder2Phone"
                      type="tel"
                      value={jointData.holder2Phone}
                      onChange={(e) => handleJointInputChange("holder2Phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="holder2Niu">NIU</Label>
                    <Input
                      id="holder2Niu"
                      value={jointData.holder2Niu}
                      onChange={(e) => handleJointInputChange("holder2Niu", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="holder2Email">Email</Label>
                  <Input
                    id="holder2Email"
                    type="email"
                    value={jointData.holder2Email}
                    onChange={(e) => handleJointInputChange("holder2Email", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="holder2Address">Adresse</Label>
                  <Input
                    id="holder2Address"
                    value={jointData.holder2Address}
                    onChange={(e) => handleJointInputChange("holder2Address", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="holder2Profession">Profession</Label>
                    <Input
                      id="holder2Profession"
                      value={jointData.holder2Profession}
                      onChange={(e) => handleJointInputChange("holder2Profession", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="holder2Employer">Employeur</Label>
                    <Input
                      id="holder2Employer"
                      value={jointData.holder2Employer}
                      onChange={(e) => handleJointInputChange("holder2Employer", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="holder2IdNumber">N° CNI</Label>
                    <Input
                      id="holder2IdNumber"
                      value={jointData.holder2IdNumber}
                      onChange={(e) => handleJointInputChange("holder2IdNumber", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="holder2IdIssuer">Émetteur</Label>
                    <Input
                      id="holder2IdIssuer"
                      value={jointData.holder2IdIssuer}
                      onChange={(e) => handleJointInputChange("holder2IdIssuer", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="holder2IdDate">Date</Label>
                    <Input
                      id="holder2IdDate"
                      type="date"
                      value={jointData.holder2IdDate}
                      onChange={(e) => handleJointInputChange("holder2IdDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* Account Types */}
            <CollapsibleSection
              title="Types de Compte"
              icon={<CreditCard className="h-5 w-5 text-indigo-600" />}
              isOpen={jointSections.accounts}
              onToggle={() => toggleJointSection("accounts")}
              required
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id="jointAccountEpargne"
                    checked={jointData.accountEpargne}
                    onCheckedChange={(checked) => handleJointInputChange("accountEpargne", checked as boolean)}
                  />
                  <Label htmlFor="jointAccountEpargne" className="cursor-pointer">
                    Épargne
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id="jointAccountCourant"
                    checked={jointData.accountCourant}
                    onCheckedChange={(checked) => handleJointInputChange("accountCourant", checked as boolean)}
                  />
                  <Label htmlFor="jointAccountCourant" className="cursor-pointer">
                    Courant
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id="jointAccountNDjangui"
                    checked={jointData.accountNDjangui}
                    onCheckedChange={(checked) => handleJointInputChange("accountNDjangui", checked as boolean)}
                  />
                  <Label htmlFor="jointAccountNDjangui" className="cursor-pointer">
                    MY N'DJANGUI
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id="jointAccountCheque"
                    checked={jointData.accountCheque}
                    onCheckedChange={(checked) => handleJointInputChange("accountCheque", checked as boolean)}
                  />
                  <Label htmlFor="jointAccountCheque" className="cursor-pointer">
                    Chèque
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id="jointAccountPlacement"
                    checked={jointData.accountPlacement}
                    onCheckedChange={(checked) => handleJointInputChange("accountPlacement", checked as boolean)}
                  />
                  <Label htmlFor="jointAccountPlacement" className="cursor-pointer">
                    Placement
                  </Label>
                </div>
              </div>
            </CollapsibleSection>

            {/* Signatures */}
            <CollapsibleSection
              title="Signatures et Validation"
              icon={<PenTool className="h-5 w-5 text-red-600" />}
              isOpen={jointSections.signatures}
              onToggle={() => toggleJointSection("signatures")}
              required
            >
              <div className="space-y-4">
                {/* Signature Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Exigences de Signature</h3>
                  <RadioGroup
                    value={jointData.signatureType}
                    onValueChange={(value) => handleJointInputChange("signatureType", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unique1" id="signature-unique1" />
                      <Label htmlFor="signature-unique1">Signature unique (de Cotitulaire 1)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unique2" id="signature-unique2" />
                      <Label htmlFor="signature-unique2">Signature unique (de Cotitulaire 2)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="double" id="signature-double" />
                      <Label htmlFor="signature-double">Double signature</Label>
                    </div>
                  </RadioGroup>
                  {errors.signatureType && <p className="text-sm text-destructive mt-1">{errors.signatureType}</p>}
                </div>

                {/* Joint Declaration */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="declaration"
                      checked={jointData.declaration}
                      onCheckedChange={(checked) => handleJointInputChange("declaration", checked as boolean)}
                      className={errors.declaration ? "border-destructive" : ""}
                    />
                    <Label htmlFor="declaration" className="text-sm">
                      Les soussignés déclarent que les biens déposés sur ce compte leur appartiennent en commun et
                      acceptent solidairement les conditions générales de la banque.
                    </Label>
                  </div>
                  {errors.declaration && <p className="text-sm text-destructive">{errors.declaration}</p>}
                </div>

                {/* Dual Signatures */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Signatures</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Signature Cotitulaire 1</h4>
                      <div className="border-2 border-dashed border-gray-300 p-4 text-center">
                        <SignatureField
                            onChange={(data) => handleJointInputChange("signature1", data)}
                        />
                        <p className="text-sm text-muted-foreground mt-2">Zone de signature</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms1Accepted"
                          checked={jointData.terms1Accepted}
                          onCheckedChange={(checked) => handleJointInputChange("terms1Accepted", checked as boolean)}
                        />
                        <Label htmlFor="terms1Accepted">Lu et approuvé</Label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Signature Cotitulaire 2</h4>
                      <div className="border-2 border-dashed border-gray-300 p-4 text-center">
                        <SignatureField
                            onChange={(data) => handleJointInputChange("signature2", data)}
                        />
                        <p className="text-sm text-muted-foreground mt-2">Zone de signature</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms2Accepted"
                          checked={jointData.terms2Accepted}
                          onCheckedChange={(checked) => handleJointInputChange("terms2Accepted", checked as boolean)}
                        />
                        <Label htmlFor="terms2Accepted">Lu et approuvé</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            <Button type="submit" className="w-full py-3 text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Soumission en cours..." : "Soumettre la Demande"}
            </Button>
        </form>
    )
}