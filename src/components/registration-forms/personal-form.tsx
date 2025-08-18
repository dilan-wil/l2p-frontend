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
import { Briefcase, CreditCard, PenTool, Phone, User, Users } from "lucide-react"

interface FormErrors {
  [key: string]: string
}

export default function PersonalForm() {
    const [personalSections, setPersonalSections] = useState({
        personalInfo: true,
        contact: false,
        emergency: false,
        professional: false,
        accounts: false,
        signature: false,
    })
    const [personalData, setPersonalData] = useState<PersonalFormData>({
        fullName: "",
        birthDate: "",
        birthPlace: "",
        nationality: "",
        resident: "",
        ppe: "",
        idNumber: "",
        idIssuer: "",
        idDate: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        profession: "",
        employer: "",
        maritalStatus: "",
        children: 0,
        salary: 0,
        contact1Name: "",
        contact1Phone: "",
        contact1Email: "",
        contact1Relation: "",
        contact2Name: "",
        contact2Phone: "",
        contact2Email: "",
        contact2Relation: "",
        accountEpargne: false,
        accountCourant: false,
        accountNDjangui: false,
        accountCheque: false,
        accountPlacement: false,
        signature: "",
        termsAccepted: false,
      })

    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
      
    const signatureRef1 = useRef<HTMLCanvasElement>(null)
    const signatureRef2 = useRef<HTMLCanvasElement>(null)
    const signatureRef3 = useRef<HTMLCanvasElement>(null)
      
    const handlePersonalInputChange = (field: keyof PersonalFormData, value: string | boolean | number) => {
      setPersonalData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const validatePersonalForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!personalData.fullName.trim()) newErrors.fullName = "Noms et Prénoms requis"
        if (!personalData.birthDate) newErrors.birthDate = "Date de naissance requise"
        if (!personalData.birthPlace.trim()) newErrors.birthPlace = "Lieu de naissance requis"
        if (!personalData.nationality.trim()) newErrors.nationality = "Nationalité requise"
        if (!personalData.resident) newErrors.resident = "Statut de résident requis"
        if (!personalData.ppe) newErrors.ppe = "Statut PPE requis"
        if (!personalData.idNumber.trim()) newErrors.idNumber = "Numéro d'identité requis"
        if (!personalData.idDate) newErrors.idDate = "Date d'émission requise"
        if (!personalData.phone.trim()) newErrors.phone = "Téléphone requis"
        if (!personalData.email.trim()) newErrors.email = "Email requis"
        if (!personalData.address.trim()) newErrors.address = "Adresse requise"
        if (!personalData.city.trim()) newErrors.city = "Ville/Quartier requis"
        if (!personalData.profession.trim()) newErrors.profession = "Profession requise"
        if (!personalData.termsAccepted) newErrors.termsAccepted = "Vous devez accepter les conditions"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
    
        const isValid = validatePersonalForm()
    
        if (!isValid) {
          setIsSubmitting(false)
          return
        }
    
        const formData = personalData
        console.log(`${"Personal"} Account Registration:`, formData)
    
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

    const togglePersonalSection = (section: keyof typeof personalSections) => {
        setPersonalSections((prev) => ({ ...prev, [section]: !prev[section] }))
    }

    return(
         <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <CollapsibleSection
              title="Informations Personnelles"
              icon={<User className="h-5 w-5 text-blue-600" />}
              isOpen={personalSections.personalInfo}
              onToggle={() => togglePersonalSection("personalInfo")}
              required
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Noms et Prénoms *</Label>
                  <Input
                    id="fullName"
                    value={personalData.fullName}
                    onChange={(e) => handlePersonalInputChange("fullName", e.target.value)}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="birthDate">Date de Naissance *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={personalData.birthDate}
                    onChange={(e) => handlePersonalInputChange("birthDate", e.target.value)}
                    className={errors.birthDate ? "border-destructive" : ""}
                  />
                  {errors.birthDate && <p className="text-sm text-destructive mt-1">{errors.birthDate}</p>}
                </div>

                <div>
                  <Label htmlFor="birthPlace">Lieu de Naissance *</Label>
                  <Input
                    id="birthPlace"
                    value={personalData.birthPlace}
                    onChange={(e) => handlePersonalInputChange("birthPlace", e.target.value)}
                    className={errors.birthPlace ? "border-destructive" : ""}
                  />
                  {errors.birthPlace && <p className="text-sm text-destructive mt-1">{errors.birthPlace}</p>}
                </div>

                <div>
                  <Label htmlFor="nationality">Nationalité *</Label>
                  <Input
                    id="nationality"
                    value={personalData.nationality}
                    onChange={(e) => handlePersonalInputChange("nationality", e.target.value)}
                    className={errors.nationality ? "border-destructive" : ""}
                  />
                  {errors.nationality && <p className="text-sm text-destructive mt-1">{errors.nationality}</p>}
                </div>

                <div>
                  <Label htmlFor="resident">Résident *</Label>
                  <Select
                    value={personalData.resident}
                    onValueChange={(value) => handlePersonalInputChange("resident", value)}
                  >
                    <SelectTrigger className={errors.resident ? "border-destructive" : ""}>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oui">Oui</SelectItem>
                      <SelectItem value="non">Non</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.resident && <p className="text-sm text-destructive mt-1">{errors.resident}</p>}
                </div>

                <div>
                  <Label htmlFor="ppe">PPE *</Label>
                  <Select value={personalData.ppe} onValueChange={(value) => handlePersonalInputChange("ppe", value)}>
                    <SelectTrigger className={errors.ppe ? "border-destructive" : ""}>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oui">Oui</SelectItem>
                      <SelectItem value="non">Non</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.ppe && <p className="text-sm text-destructive mt-1">{errors.ppe}</p>}
                </div>

                <div>
                  <Label htmlFor="idNumber">Numéro de Pièce d'Identité *</Label>
                  <Input
                    id="idNumber"
                    value={personalData.idNumber}
                    onChange={(e) => handlePersonalInputChange("idNumber", e.target.value)}
                    className={errors.idNumber ? "border-destructive" : ""}
                  />
                  {errors.idNumber && <p className="text-sm text-destructive mt-1">{errors.idNumber}</p>}
                </div>

                <div>
                  <Label htmlFor="idIssuer">Délivrée par *</Label>
                  <Input
                    id="idIssuer"
                    value={personalData.idIssuer}
                    onChange={(e) => handlePersonalInputChange("idIssuer", e.target.value)}
                    className={errors.idIssuer ? "border-destructive" : ""}
                  />
                  {errors.idIssuer && <p className="text-sm text-destructive mt-1">{errors.idIssuer}</p>}
                </div>

                <div>
                  <Label htmlFor="idDate">Date de Délivrance *</Label>
                  <Input
                    id="idDate"
                    type="date"
                    value={personalData.idDate}
                    onChange={(e) => handlePersonalInputChange("idDate", e.target.value)}
                    className={errors.idDate ? "border-destructive" : ""}
                  />
                  {errors.idDate && <p className="text-sm text-destructive mt-1">{errors.idDate}</p>}
                </div>

                <div>
                  <Label htmlFor="maritalStatus">Situation Matrimoniale</Label>
                  <Select
                    value={personalData.maritalStatus}
                    onValueChange={(value) => handlePersonalInputChange("maritalStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celibataire">Célibataire</SelectItem>
                      <SelectItem value="marie">Marié(e)</SelectItem>
                      <SelectItem value="divorce">Divorcé(e)</SelectItem>
                      <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="children">Nombre d'Enfants</Label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    value={personalData.children}
                    onChange={(e) => handlePersonalInputChange("children", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CollapsibleSection>

            {/* Contact Information Section */}
            <CollapsibleSection
              title="Informations de Contact"
              icon={<Phone className="h-5 w-5 text-green-600" />}
              isOpen={personalSections.contact}
              onToggle={() => togglePersonalSection("contact")}
              required
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={personalData.phone}
                    onChange={(e) => handlePersonalInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalData.email}
                    onChange={(e) => handlePersonalInputChange("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address">Adresse *</Label>
                  <Input
                    id="address"
                    value={personalData.address}
                    onChange={(e) => handlePersonalInputChange("address", e.target.value)}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                </div>

                <div>
                  <Label htmlFor="city">Ville *</Label>
                  <Input
                    id="city"
                    value={personalData.city}
                    onChange={(e) => handlePersonalInputChange("city", e.target.value)}
                    className={errors.city ? "border-destructive" : ""}
                  />
                  {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                </div>
              </div>
            </CollapsibleSection>

            {/* Professional Information Section */}
            <CollapsibleSection
              title="Informations Professionnelles"
              icon={<Briefcase className="h-5 w-5 text-purple-600" />}
              isOpen={personalSections.professional}
              onToggle={() => togglePersonalSection("professional")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    value={personalData.profession}
                    onChange={(e) => handlePersonalInputChange("profession", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="employer">Employeur</Label>
                  <Input
                    id="employer"
                    value={personalData.employer}
                    onChange={(e) => handlePersonalInputChange("employer", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="salary">Salaire Mensuel (FCFA)</Label>
                  <Input
                    id="salary"
                    type="number"
                    min="0"
                    value={personalData.salary}
                    onChange={(e) => handlePersonalInputChange("salary", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CollapsibleSection>

            {/* Emergency Contacts Section */}
            <CollapsibleSection
              title="Contacts d'Urgence"
              icon={<Users className="h-5 w-5 text-orange-600" />}
              isOpen={personalSections.emergency}
              onToggle={() => togglePersonalSection("emergency")}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">Contact 1</h4>
                  <div>
                    <Label htmlFor="contact1Name">Noms et Prénoms</Label>
                    <Input
                      id="contact1Name"
                      value={personalData.contact1Name}
                      onChange={(e) => handlePersonalInputChange("contact1Name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact1Phone">Téléphone</Label>
                    <Input
                      id="contact1Phone"
                      type="tel"
                      value={personalData.contact1Phone}
                      onChange={(e) => handlePersonalInputChange("contact1Phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact1Email">Email</Label>
                    <Input
                      id="contact1Email"
                      type="email"
                      value={personalData.contact1Email}
                      onChange={(e) => handlePersonalInputChange("contact1Email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact1Relation">Lien de parenté</Label>
                    <Input
                      id="contact1Relation"
                      value={personalData.contact1Relation}
                      onChange={(e) => handlePersonalInputChange("contact1Relation", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">Contact 2</h4>
                  <div>
                    <Label htmlFor="contact2Name">Noms et Prénoms</Label>
                    <Input
                      id="contact2Name"
                      value={personalData.contact2Name}
                      onChange={(e) => handlePersonalInputChange("contact2Name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact2Phone">Téléphone</Label>
                    <Input
                      id="contact2Phone"
                      type="tel"
                      value={personalData.contact2Phone}
                      onChange={(e) => handlePersonalInputChange("contact2Phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact2Email">Email</Label>
                    <Input
                      id="contact2Email"
                      type="email"
                      value={personalData.contact2Email}
                      onChange={(e) => handlePersonalInputChange("contact2Email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact2Relation">Lien de parenté</Label>
                    <Input
                      id="contact2Relation"
                      value={personalData.contact2Relation}
                      onChange={(e) => handlePersonalInputChange("contact2Relation", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* Account Types Section */}
            <CollapsibleSection
              title="Types de Compte"
              icon={<CreditCard className="h-5 w-5 text-indigo-600" />}
              isOpen={personalSections.accounts}
              onToggle={() => togglePersonalSection("accounts")}
              required
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id="accountEpargne"
                    checked={personalData.accountEpargne}
                    onCheckedChange={(checked) => handlePersonalInputChange("accountEpargne", checked as boolean)}
                  />
                  <Label htmlFor="accountEpargne" className="cursor-pointer">
                    Épargne
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id="accountCourant"
                    checked={personalData.accountCourant}
                    onCheckedChange={(checked) => handlePersonalInputChange("accountCourant", checked as boolean)}
                  />
                  <Label htmlFor="accountCourant" className="cursor-pointer">
                    Courant
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id="accountNDjangui"
                    checked={personalData.accountNDjangui}
                    onCheckedChange={(checked) => handlePersonalInputChange("accountNDjangui", checked as boolean)}
                  />
                  <Label htmlFor="accountNDjangui" className="cursor-pointer">
                    MY N'DJANGUI
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id="accountCheque"
                    checked={personalData.accountCheque}
                    onCheckedChange={(checked) => handlePersonalInputChange("accountCheque", checked as boolean)}
                  />
                  <Label htmlFor="accountCheque" className="cursor-pointer">
                    Chèque
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id="accountPlacement"
                    checked={personalData.accountPlacement}
                    onCheckedChange={(checked) => handlePersonalInputChange("accountPlacement", checked as boolean)}
                  />
                  <Label htmlFor="accountPlacement" className="cursor-pointer">
                    Placement
                  </Label>
                </div>
              </div>
            </CollapsibleSection>

            {/* Signature Section */}
            <CollapsibleSection
              title="Signature et Validation"
              icon={<PenTool className="h-5 w-5 text-red-600" />}
              isOpen={personalSections.signature}
              onToggle={() => togglePersonalSection("signature")}
              required
            >
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg bg-gray-50">
                    <SignatureField
                        onChange={(data) => handlePersonalInputChange("signature", data)}
                    />
                  <p className="text-sm text-muted-foreground mt-2">Zone de signature digitale</p>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
                  <Checkbox
                    id="termsAccepted"
                    checked={personalData.termsAccepted}
                    onCheckedChange={(checked) => handlePersonalInputChange("termsAccepted", checked as boolean)}
                    className={errors.termsAccepted ? "border-destructive" : ""}
                  />
                  <Label htmlFor="termsAccepted" className="cursor-pointer">
                    J'ai lu et j'accepte les conditions générales *
                  </Label>
                </div>
                {errors.termsAccepted && <p className="text-sm text-destructive">{errors.termsAccepted}</p>}
              </div>
            </CollapsibleSection>

            <Button type="submit" className="w-full py-3 text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Soumission en cours..." : "Soumettre la Demande"}
            </Button>
          </form>
    )
}