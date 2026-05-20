import React from 'react'

export default function TermsSection() {
  return (
    <div>
      <div id="body" className="body">
  {/* Light Background Header */}
  <div className="bg-[#fceaea] py-4">
    <div className="main-container px-4">
      <header className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Terms & Conditions</h2>
        <nav className="flex justify-center mt-2 text-sm text-[var(--text)] space-x-2">
          <a href="/" className="hover:underline">Home</a>
          <span>&gt;</span>
          <span>Terms & Conditions</span>
        </nav>
      </header>
    </div>
  </div>

  {/* Main Section */}
  <section className="bg-white py-8">
    <div className="main-container px-2">
      <div className="space-y-6">
        {/* CMS Content */}
        <div className="cms space-y-4 text-[var(--text)]">
          <h1 className="text-2xl sm:text-3xl font-bold">Sorty (FATbit Technologies)</h1>
          <h2 className="text-xl sm:text-2xl font-semibold">
            (Terms 1st to 25th Standard Terms applicable on all services/projects)
          </h2>

          <p><strong>1. Contract:</strong> The client's approval for work to commence shall be deemed a contractual agreement between the Client and Sorty. The approval for the work can be through either an email confirming back the quote (with the quote document attached) or the quote document signed by the client.</p>

          <p>Whereas, Sorty is in the business of providing Consultancy and allied Services on Computer based Information Technology...</p>

          <p><strong>Important:</strong> Payment of the advance fee indicates that the client accepts these terms and conditions, and approves to commence the work.</p>

          <p><strong>2. Usage of Sorty Services/Products/Solutions:</strong> Client agrees not to use the Sorty services/products delivered for any business which is harmful to the society or children or is illegal...</p>

          <p><strong>3. 1 Year Free Technical Support:</strong> Sorty provides 1 year free technical support for following kind of issues:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Server side scripting/programming errors/bugs</li>
            <li>Logical Bugs/Calculation related errors/bugs</li>
            <li>Connection errors/API Integration Errors</li>
          </ul>

          <p>Above support is not available if the errors/bugs arise due to any external entity...</p>

          <p><strong>4. Photography and graphics:</strong> Both the parties agree to abide by the following terms...</p>

          <p><strong>5. Browser compatibility:</strong> Sorty makes every effort to design pages that work flawlessly on most popular current browsers...</p>

          <p><strong>6. Search Engine Submission:</strong> Following services are not part of the project unless agreed otherwise in writing...</p>

          <p><strong>7. Site maintenance:</strong> Unless otherwise agreed in writing, following services will be separately billed after the website has been made live...</p>

          <p><strong>8. Content:</strong> After Sorty has delivered the website to client, client is solely responsible for the content/information/images posted on his website. If there is any error or omission by Sorty team while uploading/posting the content/information/images on client’s website, Sorty will correct it if reported to Sorty representatives.</p>
          <p><strong>9. Material:</strong> All material supplied by the client shall remain client’s property. Sorty rightfully believes that this material belongs to the client and that it does not breach any copyright laws. Under no circumstances shall Sorty be held responsible for any claims, damages, and loss of profit or reputation caused to client due to the use of material provided by the client.</p>
          <p><strong>10. Domain names booked by Sorty on behalf of client:</strong> Sorty provides domain name consultancy if required. Domain names registered by Sorty on the client’s behalf are property of Sorty until client has paid for the domain booked and any fee involved.</p>

          <p className="mt-6">
            <a href="#" className="text-[#ee3e5a] hover:underline">Please review Privacy Policies from here</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</div>

    </div>
  )
}
