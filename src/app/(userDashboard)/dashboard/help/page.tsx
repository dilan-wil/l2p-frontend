"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  Send,
  BookOpen,
  Users,
  Shield,
  CreditCard,
  Settings,
  AlertCircle,
} from "lucide-react"

// Mock FAQ data
const faqCategories = [
  {
    id: "account",
    name: "Account Management",
    icon: Users,
    faqs: [
      {
        question: "How do I update my profile information?",
        answer:
          "You can update your profile information by navigating to the Profile page in your dashboard. Click the 'Edit Profile' button to make changes to your personal information, contact details, and profile picture.",
      },
      {
        question: "How do I change my password?",
        answer:
          "Go to Settings > Security section. Enter your current password, then your new password twice to confirm. Make sure your new password is at least 8 characters long and includes a mix of letters, numbers, and symbols.",
      },
      {
        question: "Can I deactivate my account temporarily?",
        answer:
          "Yes, you can deactivate your account from the Settings page under the Danger Zone section. Deactivated accounts can be reactivated by logging in again.",
      },
    ],
  },
  {
    id: "transactions",
    name: "Transactions & Payments",
    icon: CreditCard,
    faqs: [
      {
        question: "Why is my transaction showing as pending?",
        answer:
          "Transactions may show as pending for several reasons: bank processing times, insufficient funds verification, or security checks. Most pending transactions are processed within 1-3 business days.",
      },
      {
        question: "How do I dispute a transaction?",
        answer:
          "To dispute a transaction, go to your Transactions page, find the transaction in question, and click on it for details. Then use the 'Report Issue' button to start the dispute process.",
      },
      {
        question: "What are the transaction limits?",
        answer:
          "Transaction limits vary by account type. Standard accounts have a daily limit of $5,000 and monthly limit of $25,000. Premium accounts have higher limits. Check your account settings for specific limits.",
      },
    ],
  },
  {
    id: "security",
    name: "Security & Privacy",
    icon: Shield,
    faqs: [
      {
        question: "How do I enable two-factor authentication?",
        answer:
          "Go to Settings > Security and toggle on 'Two-Factor Authentication'. You'll be guided through the setup process using your mobile device or authenticator app.",
      },
      {
        question: "What should I do if I suspect unauthorized access?",
        answer:
          "Immediately change your password, enable two-factor authentication if not already active, and contact our security team. Review your recent transactions and report any suspicious activity.",
      },
      {
        question: "How is my data protected?",
        answer:
          "We use bank-level encryption, secure data centers, and regular security audits. Your personal information is never shared with third parties without your consent.",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical Support",
    icon: Settings,
    faqs: [
      {
        question: "The app is running slowly. What can I do?",
        answer:
          "Try clearing your browser cache, disabling browser extensions, or using an incognito/private browsing window. If issues persist, try a different browser or contact support.",
      },
      {
        question: "I'm not receiving email notifications.",
        answer:
          "Check your spam folder and ensure notifications are enabled in Settings > Notifications. Add our email domain to your safe senders list. If issues continue, contact support.",
      },
      {
        question: "Can I use the app on mobile devices?",
        answer:
          "Yes, our web app is fully responsive and works on all mobile devices. We also have dedicated mobile apps available for iOS and Android.",
      },
    ],
  },
]

// Mock support ticket data
const supportCategories = [
  "Account Issues",
  "Transaction Problems",
  "Security Concerns",
  "Technical Support",
  "Feature Request",
  "Other",
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [supportForm, setSupportForm] = useState({
    category: "",
    subject: "",
    description: "",
    priority: "medium",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
//   const { toast } = useToast()

  const filteredFAQs = faqCategories.filter((category) => {
    if (selectedCategory !== "all" && category.id !== selectedCategory) return false
    if (!searchTerm) return true

    return category.faqs.some(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  })

  const handleSupportFormChange = (field: string, value: string) => {
    setSupportForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitSupportRequest = async () => {
    if (!supportForm.category || !supportForm.subject || !supportForm.description) {
    //   toast({
    //     title: "Missing Information",
    //     description: "Please fill in all required fields.",
    //     variant: "destructive",
    //   })
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)

    // Reset form
    setSupportForm({
      category: "",
      subject: "",
      description: "",
      priority: "medium",
    })

    // toast({
    //   title: "Support Request Submitted",
    //   description: "We've received your request and will respond within 24 hours. Ticket ID: #SUP-2024-001",
    // })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Support Request
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contact Us
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Search Knowledge Base</CardTitle>
              <CardDescription>Find answers to frequently asked questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for help topics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {faqCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          <div className="space-y-6">
            {filteredFAQs.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5" />
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs
                      .filter(
                        (faq) =>
                          !searchTerm ||
                          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((faq, index) => (
                        <AccordionItem key={index} value={`${category.id}-${index}`}>
                          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground text-center">
                  Try adjusting your search terms or browse all categories
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Support Request Tab */}
        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Request</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={supportForm.category}
                    onValueChange={(value) => handleSupportFormChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportCategories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase().replace(" ", "-")}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={supportForm.priority}
                    onValueChange={(value) => handleSupportFormChange("priority", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={supportForm.subject}
                  onChange={(e) => handleSupportFormChange("subject", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide as much detail as possible about your issue..."
                  rows={6}
                  value={supportForm.description}
                  onChange={(e) => handleSupportFormChange("description", e.target.value)}
                />
              </div>

              <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100">Response Time</p>
                  <p className="text-blue-700 dark:text-blue-300">
                    We typically respond within 24 hours. Urgent issues are prioritized and may receive faster
                    responses.
                  </p>
                </div>
              </div>

              <Button onClick={handleSubmitSupportRequest} disabled={isSubmitting} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Submitting..." : "Submit Support Request"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>Multiple ways to reach our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-muted-foreground text-sm mb-2">Get help via email</p>
                    <p className="text-sm">support@dashboard.com</p>
                    <Badge variant="secondary" className="mt-1">
                      24-48 hours response
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone Support</h3>
                    <p className="text-muted-foreground text-sm mb-2">Speak with our team directly</p>
                    <p className="text-sm">+1 (555) 123-HELP</p>
                    <Badge variant="secondary" className="mt-1">
                      Mon-Fri 9AM-6PM EST
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Live Chat</h3>
                    <p className="text-muted-foreground text-sm mb-2">Chat with support in real-time</p>
                    <Button size="sm" className="mt-1">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Support Hours
                </CardTitle>
                <CardDescription>When our team is available to help</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-muted-foreground">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Saturday</span>
                    <span className="text-muted-foreground">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-900 dark:text-green-100">Currently Online</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">Our support team is available now</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Emergency Support</h4>
                  <p className="text-sm text-muted-foreground">
                    For urgent security issues or account emergencies, contact us immediately at{" "}
                    <span className="font-medium">emergency@dashboard.com</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
