import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPDF = (candidate) => {

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    const LEFT = 18;
    const RIGHT = 192;
    const pageHeight = doc.internal.pageSize.getHeight();
    const footerSpace = 18;

    // Start BELOW the header
    let y = 48;

    // ============================
    // Auto Page Break
    // ============================

    const checkPage = (requiredHeight = 30) => {

        if (y + requiredHeight > pageHeight - footerSpace) {

            doc.addPage();

            y = 20;

        }

    };

    // ============================
    // Header
    // ============================

    doc.setFillColor(15,23,42);
    doc.rect(0,0,210,35,"F");

    doc.setTextColor(255);
    doc.setFont("helvetica","bold");
    doc.setFontSize(22);
    doc.text("AI Candidate Intelligence Report",LEFT,15);

    doc.setFont("helvetica","normal");
    doc.setFontSize(10);
    doc.text(`Generated : ${new Date().toLocaleString()}`,LEFT,25);

    // ============================
    // Candidate Hero
    // ============================

    doc.setTextColor(20);
    doc.setFont("helvetica","bold");
    doc.setFontSize(24);
    doc.text(candidate.candidate || "Candidate",LEFT,y);

    y += 8;

    doc.setFont("helvetica","normal");
    doc.setFontSize(12);
    doc.setTextColor(90);
    doc.text(candidate.headline || "AI Professional",LEFT,y);

    y += 10;

    const badgeWidth = 38;

    if(candidate.recommendation==="Strong Match"){

        doc.setFillColor(16,185,129);

    }else if(candidate.recommendation==="Moderate Match"){

        doc.setFillColor(37,99,235);

    }else{

        doc.setFillColor(249,115,22);

    }

    doc.roundedRect(LEFT,y-5,badgeWidth,8,2,2,"F");

    doc.setTextColor(255);
    doc.setFont("helvetica","bold");
    doc.setFontSize(10);
    doc.text(candidate.recommendation || "Recommended",LEFT+4,y);

    y += 12;

    // ============================
    // Professional Snapshot
    // ============================

    checkPage(55);

    doc.setTextColor(20);
    doc.setFont("helvetica","bold");
    doc.setFontSize(17);
    doc.text("Professional Snapshot",LEFT,y);

    y += 5;

    autoTable(doc,{

        startY:y,

        margin:{left:LEFT,right:18},

        theme:"grid",

        styles:{
            fontSize:10,
            cellPadding:3,
            lineColor:[230,230,230],
            lineWidth:0.2
        },

        headStyles:{
            fillColor:[30,64,175],
            textColor:255,
            fontStyle:"bold"
        },

        head:[["Field","Value"]],

        body:[

            ["Current Company",candidate.current_company || "Not Available"],

            ["Current Role",candidate.current_title || "Not Available"],

            ["Experience",`${candidate.experience || 0} Years`],

            ["Location",`${candidate.location || "-"}, ${candidate.country || ""}`],

            ["Industry",candidate.industry || "Not Available"]

        ]

    });

    y = doc.lastAutoTable.finalY + 12;
    // ============================
    // OVERALL AI MATCH
    // ============================

    checkPage(70);

    doc.setFont("helvetica","bold");
    doc.setFontSize(18);
    doc.setTextColor(20);
    doc.text("Overall AI Match",LEFT,y);

    y += 8;

    doc.setFont("helvetica","bold");
    doc.setFontSize(24);
    doc.setTextColor(37,99,235);

    doc.text(
        `${candidate.final_score || 0}/100`,
        105,
        y,
        {
            align:"center"
        }
    );

    y += 7;

    doc.setFont("helvetica","bold");
    doc.setFontSize(12);

    if(candidate.recommendation==="Strong Match"){
        doc.setTextColor(16,185,129);
    }else if(candidate.recommendation==="Moderate Match"){
        doc.setTextColor(37,99,235);
    }else{
        doc.setTextColor(249,115,22);
    }

    doc.text(
        candidate.recommendation || "Recommended",
        105,
        y,
        {
            align:"center"
        }
    );

    y += 7;

    // Progress Bar

    doc.setFillColor(235,235,235);
    doc.roundedRect(
        LEFT,
        y,
        175,
        6,
        3,
        3,
        "F"
    );

    doc.setFillColor(37,99,235);
    doc.roundedRect(
        LEFT,
        y,
        Math.min((candidate.final_score || 0)*1.75,175),
        6,
        3,
        3,
        "F"
    );

    y += 14;


    // ============================
    // AI SCORE BREAKDOWN
    // ============================

    checkPage(80);

    doc.setFont("helvetica","bold");
    doc.setFontSize(18);
    doc.setTextColor(20);
    doc.text("AI Score Breakdown",LEFT,y);

    y += 10;

    autoTable(doc,{

        startY:y,

        margin:{
            left:LEFT,
            right:18
        },

        theme:"grid",

        head:[["Metric","Score"]],

        body:[

            ["Capability Match",`${candidate.capability_match}%`],

            ["AI Potential",`${candidate.ai_potential}%`],

            ["Hiring Readiness",`${candidate.hiring_readiness}%`],

            ["Skill Credibility",`${candidate.skill_credibility}%`],

            ["Semantic Similarity",`${Math.round((candidate.semantic_similarity || 0)*100)}%`]

        ],

        styles:{
            fontSize:10,
            cellPadding:3,
            lineColor:[235,235,235],
            lineWidth:0.2,
            textColor:[60,60,60]
        },

        headStyles:{
            fillColor:[30,64,175],
            textColor:255,
            fontStyle:"bold",
            halign:"center",
            fontSize:11
        },

        alternateRowStyles:{
            fillColor:[248,250,252]
        },

        columnStyles:{
            0:{
                cellWidth:115,
                fontStyle:"bold"
            },
            1:{
                cellWidth:55,
                halign:"center",
                textColor:[37,99,235],
                fontStyle:"bold"
            }
        }

    });

    y = doc.lastAutoTable.finalY + 4;
    // ============================
    // AI GENERATED STRENGTHS
    // ============================

    checkPage((candidate.strengths?.length || 1) * 8 + 30);

    doc.setFont("helvetica","bold");
    doc.setFontSize(19);
    doc.setTextColor(20);
    doc.text("AI Generated Strengths",LEFT,y);

    y += 8;

    (candidate.strengths || []).forEach(item => {

        doc.setFillColor(16,185,129);
        doc.circle(LEFT+2,y-1,1.5,"F");

        doc.setFont("helvetica","normal");
        doc.setFontSize(11);
        doc.setTextColor(60);
        doc.text(item,LEFT+7,y);

        y += 9;

    });

    y += 0;


    // ============================
    // PROFESSIONAL SUMMARY
    // ============================

    const summary = doc.splitTextToSize(

        candidate.profile_summary ||

        candidate.ai_summary ||

        "No professional summary available.",

        168

    );

    const summaryHeight = summary.length * 5 + 12;
    checkPage(summaryHeight + 8);

    doc.setFont("helvetica","bold");
    doc.setFontSize(19);
    doc.setTextColor(20);
    doc.text("Professional Summary",LEFT,y);

    y += 10;

    doc.setFillColor(248,250,252);
    doc.roundedRect(LEFT,y,180,summaryHeight,3,3,"F");

    doc.setDrawColor(220);
    doc.roundedRect(LEFT,y,180,summaryHeight,3,3);

    doc.setFont("helvetica","normal");
    doc.setFontSize(11);
    doc.setTextColor(70);

    doc.text(summary,LEFT+5,y+8,{maxWidth:170,lineHeightFactor:1.5});

    y += summaryHeight + 8;


    // ============================
    // TECHNICAL SKILLS
    // ============================

    const skills = (candidate.skills || []).map(skill =>
        typeof skill === "object" ? skill.name : skill
    );

    const rows = [];

    for(let i=0;i<skills.length;i+=3){

        rows.push([
            skills[i] || "",
            skills[i+1] || "",
            skills[i+2] || ""
        ]);

    }

    checkPage(rows.length * 7 + 20);

    doc.setFont("helvetica","bold");
    doc.setFontSize(19);
    doc.setTextColor(20);
    doc.text("Technical Skills",LEFT,y);

    y += 8;

    autoTable(doc,{

        startY:y,

        head:[["Skill","Skill","Skill"]],

        body:rows,

        theme:"grid",

        styles:{fontSize:10,cellPadding:3,halign:"center",lineColor:[235,235,235],lineWidth:0.2

        },

        headStyles:{fillColor:[30,64,175],textColor:255,fontStyle:"bold",halign:"center"},

        alternateRowStyles:{fillColor:[248,250,252]}

    });

    y = doc.lastAutoTable.finalY + 8;
    // ============================
    // AI RECOMMENDATION
    // ============================

    const recommendation = doc.splitTextToSize(

        candidate.ai_summary ||

        `${candidate.candidate} demonstrates good alignment with the provided job description and is recommended for the next stage of technical evaluation.`,

        168

    );

    const recommendationHeight = recommendation.length * 4.2 + 14;

    checkPage(recommendationHeight + 8);

    doc.setFont("helvetica","bold");
    doc.setFontSize(18);
    doc.setTextColor(20);
    doc.text("AI Recommendation",LEFT,y);

    y += 8;

    doc.setFillColor(239,246,255);
    doc.roundedRect(
        LEFT,
        y,
        174,
        recommendationHeight,
        4,
        4,
        "F"
    );

    doc.setDrawColor(191,219,254);
    doc.roundedRect(
        LEFT,
        y,
        174,
        recommendationHeight,
        4,
        4
    );

    doc.setFont("helvetica","bold");
    doc.setFontSize(12);
    doc.setTextColor(30,64,175);
    doc.text(
        candidate.recommendation || "Recommended",
        LEFT + 6,
        y + 8
    );

    doc.setFont("helvetica","normal");
    doc.setFontSize(10);
    doc.setTextColor(70);

    doc.text(
        recommendation,
        LEFT + 6,
        y + 16,
        {
            maxWidth:162,
            lineHeightFactor:1.35
        }
    );

    y += recommendationHeight + 8;


    // ============================
    // FOOTER
    // ============================

    const footerY = doc.internal.pageSize.getHeight() - 10;

    doc.setDrawColor(220);
    doc.line(
        LEFT,
        footerY - 5,
        192,
        footerY - 5
    );

    doc.setFont("helvetica","normal");
    doc.setFontSize(8);
    doc.setTextColor(120);

    doc.text(
        "AI Candidate Intelligence Report",
        LEFT,
        footerY
    );

    doc.text(
        new Date().toLocaleDateString(),
        192,
        footerY,
        {
            align:"right"
        }
    );


    // ============================
    // SAVE PDF
    // ============================

    doc.save(
        `${(candidate.candidate || "Candidate").replace(/\s+/g,"_")}_AI_Report.pdf`
    );

};