import React from 'react'
import './Job.css'

const Job = () => {
    return (
        <div className='job_container'>
            <h4 className='job_title'>It Jobs</h4>

            <section className="job_content">
                {/* job detatils first */}
                <sectin className="job_Card">
                    <section className="company_logo">
                        <img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png" alt="" />
                    </section>
                    <section className="job_category">
                        <h6>Company PVT LTD</h6>
                        <li>Job Title</li>
                        <li>Job Title</li>
                    </section>
                </sectin>

                {/* job detatils first */}
                <sectin className="job_Card">
                    <section className="company_logo">
                        <img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png" alt="" />
                    </section>
                    <section className="job_category">
                        <h6>Company PVT LTD</h6>
                        <li>Job Title</li>
                        <li>Job Title</li>
                    </section>
                </sectin>


            </section>

        </div>
    )
}

export default Job
