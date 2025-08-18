"use client"

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
import SignatureField from "./signature"
import PersonalForm from "./registration-forms/personal-form"
import JointForm from "./registration-forms/joint-form"

interface FormErrors {
  [key: string]: string
}

export function BankRegistrationForm() {
  const [activeTab, setActiveTab] = useState("personal")
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

  const handlePersonalInputChange = (field: keyof PersonalFormData, value: string | boolean | number) => {
    setPersonalData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleJointInputChange = (field: keyof JointFormData, value: string | boolean | number) => {
    setJointData((prev) => ({ ...prev, [field]: value }))
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

    const isValid = activeTab === "personal" ? validatePersonalForm() : validateJointForm()

    if (!isValid) {
      setIsSubmitting(false)
      return
    }

    const formData = activeTab === "personal" ? personalData : jointData
    console.log(`${activeTab === "personal" ? "Personal" : "Joint"} Account Registration:`, formData)

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulaire d'Ouverture de Compte</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Compte Personnel</TabsTrigger>
            <TabsTrigger value="joint">Compte Joint</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalForm />
          </TabsContent>

          <TabsContent value="joint">
            <JointForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
