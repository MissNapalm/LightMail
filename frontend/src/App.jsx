    import React, { useState } from "react";
    import Sidebar from "./components/Sidebar";
    import Inbox from "./components/Inbox";
    import ComposeEmail from "./components/ComposeEmail";
    import EmailViewer from "./components/EmailViewer";
    import ReplyForm from "./components/ReplyForm";
    import { X, Moon, Sun, Menu } from 'lucide-react';

    function App() {
    const [view, setView] = useState("inbox");
    const [showReply, setShowReply] = useState(false);
    const [showCompose, setShowCompose] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [notification, setNotification] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isDark, setIsDark] = useState(false);
    
    const [emails, setEmails] = useState({
        inbox: [
            { 
                id: 1, 
                from: "system@lightmail.com",
                to: "user@lightmail.com",
                subject: "Welcome to LightMail! ✨", 
                content: "Thank you for choosing LightMail! We're thrilled to have you on board. This email client has been designed with simplicity and elegance in mind, making it easy for you to organize, read, and send emails. Whether you're a seasoned email user or someone exploring for the first time, LightMail is here to enhance your communication experience. Start by exploring your inbox, and let us know how we can make it even better for you!", 
                time: "Today",
                unread: true,
                labels: ["Important", "Welcome"]
            },
            { 
                id: 2, 
                from: "updates@lightmail.com",
                to: "user@lightmail.com",
                subject: "Your Daily Brief 📮", 
                content: "Good morning! Here's a quick summary of the updates you might find interesting today. We've introduced new animations that make navigating your inbox smoother than ever. Our dark mode has also been enhanced to provide better contrast and readability. Lastly, we've added a streamlined reading experience to help you focus on what's important without distractions. Stay tuned for more updates as we continue improving LightMail!", 
                time: "Yesterday",
                unread: true,
                labels: ["Updates"]
            },
            {
                id: 3,
                from: "news@citywide.org",
                to: "user@lightmail.com",
                subject: "Breaking: El Presidente Collapses on Stage",
                content: "In a shocking turn of events, El Presidente collapsed during a live address earlier today. Eyewitnesses report seeing him clutch his chest before falling to the ground. While officials have yet to confirm the cause, rumors are circulating about potential foul play. Stay tuned as more information comes to light about this unprecedented situation and its potential implications on the nation.",
                time: "Yesterday",
                unread: true,
                labels: ["News", "Important"]
            },
            {
                id: 4,
                from: "updates@lightmail.com",
                to: "user@lightmail.com",
                subject: "New Feature: Email Labels",
                content: "We’re excited to announce the release of email labels, allowing you to organize your inbox like never before. Apply labels like 'Work,' 'Family,' or 'Urgent' to keep your messages neatly categorized. To use this feature, simply click on an email and select the label icon. Your inbox just got a whole lot smarter!",
                time: "Two Days Ago",
                unread: true,
                labels: ["Updates"]
            },
            {
                id: 5,
                from: "susan@homeupdates.com",
                to: "user@lightmail.com",
                subject: "It’s probably nothing, but...",
                content: "Hi honey, just wanted to give you a quick update on my skin condition. It's been feeling a little scaly lately, but I’m sure it’s nothing to worry about. I’ve been applying some aloe vera gel, and it seems to help. If it gets worse, I’ll let you know. Hope you’re having a great day at work!",
                time: "Three Days Ago",
                unread: true,
                labels: ["Personal"]
            },
            {
                id: 6,
                from: "news@citywide.org",
                to: "user@lightmail.com",
                subject: "El Presidente Declared Dead",
                content: "Officials have now confirmed that El Presidente passed away following his collapse during the live address. A state of mourning has been declared, and arrangements for a national funeral are underway. The nation is left grappling with uncertainty as questions arise about who will assume leadership during this critical time. Updates to follow.",
                time: "Three Days Ago",
                unread: true,
                labels: ["News", "Critical"]
            },
            {
                id: 7,
                from: "updates@lightmail.com",
                to: "user@lightmail.com",
                subject: "LightMail Tip: Custom Themes 🎨",
                content: "Did you know you can customize LightMail to fit your style? Explore our settings to find a variety of themes that suit your preferences. From soothing pastel tones to bold high-contrast options, there’s something for everyone. Give it a try and make LightMail truly yours!",
                time: "Four Days Ago",
                unread: true,
                labels: ["Updates"]
            },
            {
                id: 8,
                from: "susan@homeupdates.com",
                to: "user@lightmail.com",
                subject: "Weird things happening",
                content: "Hey babe, something strange is going on. My skin is definitely getting greener, and I swear my pupils looked like slits this morning. It’s probably just an allergic reaction to something. Maybe I should stop using that new lotion? Let me know if you think I should go to the doctor.",
                time: "Four Days Ago",
                unread: true,
                labels: ["Personal"]
            },
            {
                id: 9,
                from: "news@citywide.org",
                to: "user@lightmail.com",
                subject: "Breaking: El Presidente’s Resurrection",
                content: "In a groundbreaking scientific event, El Presidente has been resurrected with advanced robotics technology. Now known as Mecha Presidente, he has vowed to lead the nation into a new era of prosperity and strength. Citizens are encouraged to show their support for this bold new chapter in our history.",
                time: "Four Days Ago",
                unread: true,
                labels: ["News"]
            },
            {
                id: 10,
                from: "susan@homeupdates.com",
                to: "user@lightmail.com",
                subject: "I think I’m turning into a lizard?",
                content: "Hi love, okay, this is officially weird. My skin is full-on scaly now, and I’m shedding in places. Also, my tongue has started doing this flicking thing like a lizard’s. I think I might need to see a specialist. Or maybe a biologist? What do you think?",
                time: "Five Days Ago",
                unread: true,
                labels: ["Personal", "Urgent"]
            },
            {
                id: 18,
                from: "propaganda@mechapresidente.gov",
                to: "user@lightmail.com",
                subject: "El Presidente is Dead. Long Live MECHA PRESIDENTE!",
                content: "Citizens, the past is gone. The age of Mecha Presidente is upon us, and there’s no turning back. Embrace the change, for resistance is futile. Mecha Presidente has already eliminated threats to our nation’s future. Join us in celebrating this monumental transformation. Long live MECHA PRESIDENTE!",
                time: "Eight Days Ago",
                unread: true,
                labels: ["Government", "Mandatory"]
            },
            {
                id: 12,
                from: "susan@homeupdates.com",
                to: "user@lightmail.com",
                subject: "It’s happening faster now",
                content: "Hi sweetheart, things are escalating. I woke up this morning, and my hands are fully clawed, like something out of a sci-fi movie. I also caught myself hissing at the toaster. I think we need to figure out what’s happening before I end up in a terrarium. Please come home soon!",
                time: "Six Days Ago",
                unread: true,
                labels: ["Personal", "Urgent"]
            },
            {
                id: 13,
                from: "news@citywide.org",
                to: "user@lightmail.com",
                subject: "Controversy Surrounds Mecha Presidente",
                content: "Critics are questioning the rapid resurrection of Mecha Presidente, citing concerns over the ethical implications and potential risks of merging human leadership with artificial intelligence. Supporters, however, argue that Mecha Presidente’s robotic enhancements are exactly what the nation needs to stay ahead in the global race for technological dominance.",
                time: "Six Days Ago",
                unread: true,
                labels: ["News", "Critical"]
            },
            {
                id: 14,
                from: "propaganda@mechapresidente.gov",
                to: "user@lightmail.com",
                subject: "Your Role in the New Era",
                content: "Greetings, Citizen. Under Mecha Presidente’s leadership, every individual has a role to play in building a brighter future. Join the workforce of tomorrow by contributing your skills to our nation’s ambitious projects. Opportunities are endless, and rewards are unmatched. Mecha Presidente believes in YOU. Will you rise to the challenge?",
                time: "Six Days Ago",
                unread: true,
                labels: ["Government", "Motivational"]
            },
            {
                id: 15,
                from: "susan@homeupdates.com",
                to: "user@lightmail.com",
                subject: "I may have eaten a fly",
                content: "Honey, I need to tell you something, and I hope you won’t freak out. I was sitting in the kitchen when a fly buzzed past, and before I knew it, I… ate it. It was instinctive, I swear. I’m scared this isn’t just some weird allergy anymore. What do we do?",
                time: "Seven Days Ago",
                unread: true,
                labels: ["Personal", "Urgent"]
            },
            {
                id: 16,
                from: "news@citywide.org",
                to: "user@lightmail.com",
                subject: "Mass Protests Against Mecha Presidente",
                content: "Thousands have taken to the streets in protest of Mecha Presidente’s rule, demanding transparency and accountability. Protesters are concerned about potential abuses of power and the lack of safeguards against AI-driven leadership. Authorities have urged citizens to remain calm, but tensions continue to rise as divisions deepen.",
                time: "Seven Days Ago",
                unread: true,
                labels: ["News", "Critical"]
            },
            {
                id: 17,
                from: "susan@homeupdates.com",
                to: "user@lightmail.com",
                subject: "I don’t know how much time I have left",
                content: "Darling, I think I’m losing control. My thoughts feel… different. I keep staring at the terrarium in the pet store down the street like it’s calling to me. I don’t know what’s happening, but I need your help. Please don’t let me turn into some kind of monster.",
                time: "Eight Days Ago",
                unread: true,
                labels: ["Personal", "Critical"]
            },
            {
                id: 19,
                from: "news@citywide.org",
                to: "user@lightmail.com",
                subject: "Reports of Forced Relocations Emerge",
                content: "Alarming reports suggest that dissenters of Mecha Presidente’s regime are being forcibly relocated to ‘re-education centers.’ Authorities deny these allegations, claiming the centers are voluntary facilities for national unity programs. However, eyewitnesses describe scenes of resistance being met with overwhelming force. The truth remains unclear.",
                time: "Eight Days Ago",
                unread: true,
                labels: ["News", "Critical"]
            },
            {
                id: 20,
                from: "susan@homeupdates.com",
                to: "user@lightmail.com",
                subject: "Goodbye, my love",
                content: "This is the hardest email I’ve ever had to write. I can feel the last bits of my humanity slipping away. I’m leaving so you won’t have to see what I’m becoming. Please remember me as I was, not as what I’m turning into. I’ll always love you.",
                time: "Nine Days Ago",
                unread: true,
                labels: ["Personal", "Heartbreaking"]
            },
            {
                id: 21,
                from: "updates@lightmail.com",
                to: "user@lightmail.com",
                subject: "System Update: Enhanced Filters Activated",
                content: "We’ve upgraded LightMail with advanced spam detection and intelligent filters. These enhancements ensure a safer and more streamlined inbox experience. All suspicious links and content will be flagged for your protection. Thank you for choosing LightMail, your secure email solution.",
                time: "Ten Days Ago",
                unread: true,
                labels: ["Updates", "Security"]
            },
            {
                id: 22,
                from: "propaganda@mechapresidente.gov",
                to: "user@lightmail.com",
                subject: "Mandatory Loyalty Program Enrollment",
                content: "Dear Citizen, all individuals are now required to enroll in the National Loyalty Program. Your participation demonstrates your unwavering commitment to Mecha Presidente’s vision for a united and prosperous nation. Failure to comply may result in corrective action. Sign up today and be part of the future!",
                time: "Ten Days Ago",
                unread: true,
                labels: ["Government", "Mandatory"]
            },
            {
                id: 23,
                from: "news@citywide.org",
                to: "user@lightmail.com",
                subject: "Leaked Plans Reveal Expansion of Mecha Presidente’s Power",
                content: "Newly leaked documents suggest plans to expand Mecha Presidente’s control beyond national borders. The documents detail initiatives aimed at integrating robotic governance on a global scale. Supporters praise the move as visionary, while critics warn of unprecedented authoritarian control.",
                time: "Eleven Days Ago",
                unread: true,
                labels: ["News", "Leaked"]
            },
            {
                id: 24,
                from: "susan@homeupdates.com",
                to: "user@lightmail.com",
                subject: "I found a cave",
                content: "I’ve left the city and found a cave deep in the woods. It feels strangely comforting here, like it’s meant for me. My scales are harder now, and my vision has changed. I can see in the dark, and the shadows feel alive. I miss you.",
                time: "Eleven Days Ago",
                unread: true,
                labels: ["Personal", "Heartbreaking"]
            },
            {
                id: 25,
                from: "propaganda@mechapresidente.gov",
                to: "user@lightmail.com",
                subject: "Mecha Presidente Declares: ‘The Future is Automated’",
                content: "Under the supreme leadership of Mecha Presidente, automation will revolutionize every aspect of our lives. From industries to public services, efficiency and productivity will reach unparalleled heights. Trust in Mecha Presidente to guide us into this brave new world.",
                time: "Twelve Days Ago",
                unread: true,
                labels: ["Government", "Important"]
            },
            {
                id: 26,
                from: "news@citywide.org",
                to: "user@lightmail.com",
                subject: "Resistance Groups Forming Underground",
                content: "Reports indicate the formation of underground resistance movements opposing Mecha Presidente’s regime. Operating in secrecy, these groups claim to fight for freedom and human rights. The government has dismissed these claims, branding them as ‘traitorous acts.’ The situation grows increasingly volatile.",
                time: "Twelve Days Ago",
                unread: true,
                labels: ["News", "Critical"]
            },
            {
                id: 27,
                from: "susan@homeupdates.com",
                to: "user@lightmail.com",
                subject: "The cave has secrets",
                content: "I discovered carvings on the cave walls, symbols I don’t understand. They glow faintly when I touch them, and I feel a connection I can’t explain. It’s as if this place was waiting for me. I’m not afraid anymore, but I wish you were here.",
                time: "Thirteen Days Ago",
                unread: true,
                labels: ["Personal", "Mysterious"]
            },
            {
                id: 28,
                from: "propaganda@mechapresidente.gov",
                to: "user@lightmail.com",
                subject: "Victory is Assured with Mecha Presidente",
                content: "Citizens, victory over all challenges is within our grasp under Mecha Presidente’s infallible leadership. Challenges will be crushed, and doubters will be enlightened. Stand with us, and let no obstacle hinder our path to glory. Remember: loyalty is strength!",
                time: "Thirteen Days Ago",
                unread: true,
                labels: ["Government", "Motivational"]
            },
            {
                id: 29,
                from: "news@citywide.org",
                to: "user@lightmail.com",
                subject: "Mecha Presidente Faces Growing Resistance",
                content: "Despite crackdowns, resistance movements are gaining momentum, fueled by public dissatisfaction with Mecha Presidente’s authoritarian measures. Supporters of the resistance call for unity and human rights, while government forces intensify efforts to suppress dissent. The nation is at a crossroads.",
                time: "Fourteen Days Ago",
                unread: true,
                labels: ["News", "Critical"]
            },
            {
                id: 30,
                from: "susan@homeupdates.com",
                to: "user@lightmail.com",
                subject: "Goodbye for now",
                content: "I’ve embraced what I’ve become, and the cave has become my home. I don’t feel human anymore, but I feel… whole. I’ll always cherish the life we had together. This isn’t goodbye forever; it’s just goodbye for now. I hope you find peace.",
                time: "Fourteen Days Ago",
                unread: true,
                labels: ["Personal", "Heartbreaking"]
            }
        ],
        sent: [],
        drafts: [],
        archive: [],
    });

    const toggleDarkMode = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle("dark");
    };

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSendEmail = (email) => {
        const newEmail = {
        ...email,
        id: Date.now(),
        from: "user@lightmail.com",
        time: new Date().toLocaleString(),
        labels: ["Sent"]
        };
        
        setEmails(prev => ({
        ...prev,
        sent: [...prev.sent, newEmail],
        }));
        showNotification("Message sent successfully! ✨");
        setShowCompose(false);
        setShowReply(false);

        setTimeout(() => {
        const receivedEmail = {
            ...newEmail,
            id: Date.now() + 1,
            to: email.from,
            from: email.to,
            unread: true,
            labels: ["New"]
        };
        setEmails(prev => ({
            ...prev,
            inbox: [...prev.inbox, receivedEmail],
        }));
        showNotification("New message received! 📫");
        }, 1000);
    };

    const handleDeleteEmail = (emailId) => {
        setEmails(prev => ({
        ...prev,
        [view]: prev[view].filter(email => email.id !== emailId),
        }));
        setSelectedEmail(null);
        showNotification("Message moved to trash 🗑️", "info");
    };

    const rightPanel = showCompose ? (
        <ComposeEmail 
        onSend={handleSendEmail} 
        onCancel={() => setShowCompose(false)} 
        />
    ) : showReply ? (
        <ReplyForm
        email={selectedEmail}
        onSend={handleSendEmail}
        onCancel={() => {
            setShowReply(false);
            setSelectedEmail(null);
        }}
        />
    ) : selectedEmail ? (
        <EmailViewer
        email={selectedEmail}
        onBack={() => setSelectedEmail(null)}
        onDelete={() => handleDeleteEmail(selectedEmail.id)}
        onReply={() => setShowReply(true)}
        />
    ) : null;

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
        {notification && (
            <div 
            className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500
                ${notification.type === "success" ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-blue-500 to-cyan-600"}
                text-white flex items-center space-x-2 z-50 animate-bounce`}
            >
            <span>{notification.message}</span>
            </div>
        )}

        <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-10">
            <div className="flex items-center space-x-4">
            <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
                <Menu size={24} />
            </button>
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white transform hover:rotate-12 transition-all duration-300 shadow-lg">
                ✉️
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                LightMail
                </h1>
            </div>
            </div>
            
            <button
            onClick={toggleDarkMode}
            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:scale-110 transition-all duration-300 transform shadow-md"
            >
            {isDark ? <Sun className="text-yellow-500" size={24} /> : <Moon className="text-blue-500" size={24} />}
            </button>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div 
            className={`transform transition-all duration-300 ${
                sidebarOpen ? 'w-64' : 'w-0'
            }`}
            >
            {sidebarOpen && (
                <Sidebar 
                view={view} 
                setView={setView} 
                setShowCompose={setShowCompose}
                />
            )}
            </div>
            
            {/* Main Content Area */}
            <div className={`flex-1 flex transition-all duration-300 ${rightPanel ? 'mr-[600px]' : ''}`}>
            <div className="flex-1 p-6 overflow-auto">
                <Inbox 
                emails={emails[view]} 
                setSelectedEmail={setSelectedEmail}
                currentFolder={view}
                />
            </div>
            </div>

            {/* Right Panel */}
            <div 
            className={`fixed right-0 top-[73px] bottom-0 w-[600px] transform transition-all duration-300 shadow-lg
                ${rightPanel ? 'translate-x-0' : 'translate-x-full'}`}
            >
            {rightPanel}
            </div>
        </div>
        </div>
    );
    }

    export default App;