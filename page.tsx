"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Moon, Sun, ExternalLink, Mail, Linkedin, Download, MapPin, Calendar, Building, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  const companies = [
    { name: "1mg", logo: "/placeholder.svg?height=40&width=80" },
    { name: "Purplle", logo: "/placeholder.svg?height=40&width=80" },
    { name: "Zepto", logo: "/placeholder.svg?height=40&width=80" },
    { name: "Wakefern", logo: "/placeholder.svg?height=40&width=80" },
    { name: "Snapdeal", logo: "/placeholder.svg?height=40&width=80" },
    { name: "Tesco", logo: "/placeholder.svg?height=40&width=80" },
    { name: "Tata Neu", logo: "/placeholder.svg?height=40&width=80" },
    { name: "Tata Croma", logo: "/placeholder.svg?height=40&width=80" },
    { name: "Takealot", logo: "/placeholder.svg?height=40&width=80" },
    { name: "Amazon", logo: "/placeholder.svg?height=40&width=80" },
  ]

  const projects = [
    {
      title: "Zoho Drive Product Spec",
      description:
        "Comprehensive product specification for cloud storage enhancement with user research insights and technical requirements.",
      tags: ["Product Strategy", "User Research", "PRD"],
      link: "/projects/zoho-drive-spec",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Hevo Root Cause Analysis",
      description:
        "Deep-dive analysis into data pipeline performance issues, identifying bottlenecks and optimization opportunities.",
      tags: ["Data Analysis", "Problem Solving", "RCA"],
      link: "/projects/hevo-rca",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Investomart Pitch Deck",
      description:
        "Strategic investment platform proposal with comprehensive market analysis and competitive positioning.",
      tags: ["Market Research", "Strategy", "Pitch"],
      link: "/projects/investomart-pitch",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "E-commerce Optimization",
      description:
        "Conversion rate optimization project for retail platform resulting in 25% improvement in checkout completion.",
      tags: ["A/B Testing", "Analytics", "UX"],
      link: "/projects/ecommerce-optimization",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const skills = {
    product: ["Product Strategy", "User Research", "Wireframing", "PRDs", "Roadmapping", "A/B Testing"],
    tools: ["Figma", "SQL", "Postman", "Jira", "Notion", "Google Analytics"],
    certifications: ["Google Analytics Certified", "Scrum Master", "Product Management Certificate"],
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground">
        {/* Enhanced Header with Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-lg">Alex Portfolio</span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-muted ${
                      activeSection === item.id
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="w-px h-6 bg-border mx-2" />
                <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Link href="/resume.pdf" target="_blank">
                    <Download className="h-4 w-4" />
                    Resume
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="rounded-full"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-border/40">
                <nav className="flex flex-col space-y-2 pt-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
                        activeSection === item.id
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button asChild variant="outline" className="gap-2 mt-4 bg-transparent">
                    <Link href="/resume.pdf" target="_blank">
                      <Download className="h-4 w-4" />
                      Download Resume
                    </Link>
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="pt-24 pb-20 px-4 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <div className="relative inline-block mb-6">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Profile"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto border-4 border-primary/20 shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background shadow-lg"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight">
                Hey, I'm Alex! 👋
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
                Associate Product Manager crafting 0-to-1 products that users love
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Mumbai, India</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                  <Building className="h-4 w-4 text-primary" />
                  <span>Osmos</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>BITS Pilani Alum</span>
                </div>
              </div>
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Let's Connect
              </Button>
            </div>
          </div>
        </section>

        {/* About Me */}
        <section id="about" className="py-20 px-4 bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              About Me
            </h2>
            <Card className="p-8 md:p-12 shadow-xl border-0 bg-gradient-to-br from-background to-muted/20">
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-xl leading-relaxed mb-6 font-medium">
                  <strong className="text-primary">Dear Reader,</strong> 📝
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                  Welcome to my little corner of the internet! I'm currently building the future of retail technology at{" "}
                  <strong className="text-primary">Osmos</strong>, where I get to work on exciting 0-to-1 products that
                  directly impact how businesses operate and grow.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                  My journey started at <strong className="text-primary">BITS Pilani</strong>, where I discovered my
                  passion for solving complex problems through technology. What really gets me excited is that sweet
                  spot where user needs meet business strategy – it's like solving a puzzle where every piece matters.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                  When I'm not diving deep into product specs or analyzing user behavior, you'll find me on the dance
                  floor 💃 (yes, I believe rhythm helps with product rhythm too!) or strategizing about the next big
                  product opportunity.
                </p>
                <p className="text-lg leading-relaxed">
                  I love building products that don't just work, but work <em className="text-primary">beautifully</em>{" "}
                  for the people who use them every day.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Work Experience */}
        <section id="experience" className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Work Experience
            </h2>
            <div className="space-y-8">
              <Card className="p-6 md:p-8 shadow-xl border-0 bg-gradient-to-br from-background to-muted/10 hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <CardTitle className="text-xl md:text-2xl mb-2">Associate Product Manager</CardTitle>
                      <CardDescription className="text-lg font-semibold text-primary">Osmos</CardDescription>
                    </div>
                    <Badge variant="secondary" className="self-start px-4 py-2 text-sm font-medium">
                      2023 - Present
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-lg">•</span>
                      <span className="text-base leading-relaxed">
                        Led complete billing system revamp, improving payment success rate by{" "}
                        <strong className="text-primary">35%</strong> and reducing customer support tickets by{" "}
                        <strong className="text-primary">50%</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-lg">•</span>
                      <span className="text-base leading-relaxed">
                        Launched <strong className="text-primary">3 new ad format products</strong> from 0-to-1,
                        generating <strong className="text-primary">$2M+</strong> in additional revenue within 6 months
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-lg">•</span>
                      <span className="text-base leading-relaxed">
                        Collaborated with <strong className="text-primary">10+ retail brands</strong> to optimize their
                        digital advertising strategies and improve ROAS by <strong className="text-primary">40%</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-lg">•</span>
                      <span className="text-base leading-relaxed">
                        Built and maintained product roadmaps, conducted user interviews, and delivered comprehensive
                        PRDs
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6 md:p-8 shadow-xl border-0 bg-gradient-to-br from-background to-muted/10 hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <CardTitle className="text-xl md:text-2xl mb-2">Market Risk Intern</CardTitle>
                      <CardDescription className="text-lg font-semibold text-primary">Credit Suisse</CardDescription>
                    </div>
                    <Badge variant="secondary" className="self-start px-4 py-2 text-sm font-medium">
                      Summer 2022
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-lg">•</span>
                      <span className="text-base leading-relaxed">
                        Analyzed market risk exposure across equity and fixed income portfolios worth{" "}
                        <strong className="text-primary">$500M+</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-lg">•</span>
                      <span className="text-base leading-relaxed">
                        Developed automated reporting tools using Python and SQL, reducing manual work by{" "}
                        <strong className="text-primary">60%</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-lg">•</span>
                      <span className="text-base leading-relaxed">
                        Presented risk assessment findings to senior management and contributed to strategic
                        decision-making
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Companies Worked With */}
        <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-muted-foreground">
              Companies I've Worked With
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 hover:scale-110 transform"
                >
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    width={80}
                    height={40}
                    className="max-h-10 w-auto filter drop-shadow-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Link key={index} href={project.link}>
                  <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-gradient-to-br from-background to-muted/10 hover:scale-[1.02] transform overflow-hidden">
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="group-hover:text-primary transition-colors duration-300 text-lg md:text-xl">
                          {project.title}
                        </CardTitle>
                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110 transform" />
                      </div>
                      <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="text-xs px-3 py-1 bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 px-4 bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 md:p-8 shadow-xl border-0 bg-gradient-to-br from-background to-muted/10 hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
                <CardHeader className="pb-6">
                  <CardTitle className="text-lg md:text-xl text-primary">Product Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {skills.product.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="default"
                        className="text-xs px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 md:p-8 shadow-xl border-0 bg-gradient-to-br from-background to-muted/10 hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
                <CardHeader className="pb-6">
                  <CardTitle className="text-lg md:text-xl text-primary">Tools & Tech</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {skills.tools.map((tool, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs px-3 py-2 border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 md:p-8 shadow-xl border-0 bg-gradient-to-br from-background to-muted/10 hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
                <CardHeader className="pb-6">
                  <CardTitle className="text-lg md:text-xl text-primary">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {skills.certifications.map((cert, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs px-3 py-2 bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-colors"
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Let's Connect!
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
              Always excited to discuss product strategy, share insights, or explore new opportunities. Let's build
              something amazing together!
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                asChild
                size="lg"
                className="gap-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base"
              >
                <Link href="mailto:alex@example.com">
                  <Mail className="h-5 w-5" />
                  Email Me
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-3 bg-background text-foreground border-2 hover:bg-muted shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base"
              >
                <Link href="https://linkedin.com/in/alex" target="_blank">
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-3 bg-background text-foreground border-2 hover:bg-muted shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base"
              >
                <Link href="/resume.pdf" target="_blank">
                  <Download className="h-5 w-5" />
                  Resume
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto max-w-4xl text-center text-muted-foreground">
            <p className="text-sm md:text-base">&copy; 2024 Alex. Built with Next.js and lots of ☕</p>
            <p className="text-xs mt-2 opacity-70">Crafted with passion for great product experiences</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
