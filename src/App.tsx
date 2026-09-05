import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  Fingerprint,
  Gift,
  LockKeyhole,
  Menu,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserRound,
  X,
  XCircle,
  Zap,
} from 'lucide-react'

type FlowStatus = 'idle' | 'pending' | 'scanning' | 'approved' | 'rejected'
type PhoneScreen = 'home' | 'authorise'
type ScenarioKey = 'redemption' | 'device' | 'password' | 'suspicious'

type Scenario = {
  label: string
  title: string
  item: string
  amount: string
  notification: string
  detail: string
  icon: typeof Gift
}

const scenarios: Record<ScenarioKey, Scenario> = {
  redemption: {
    label: 'High Value Redemption',
    title: 'Premium Reward Voucher',
    item: '10,000 Waterbucks',
    amount: '10,000 WB',
    notification: 'Sensitive transaction requires your approval.',
    detail: 'Redeem 10,000 Waterbucks',
    icon: Gift,
  },
  device: {
    label: 'New Device Login',
    title: 'New device sign-in',
    item: 'Chrome on Windows',
    amount: 'New device',
    notification: 'A new device is trying to access your account.',
    detail: 'Chrome on Windows · Johannesburg',
    icon: Smartphone,
  },
  password: {
    label: 'Password Change',
    title: 'Password change request',
    item: 'Account security',
    amount: 'Profile change',
    notification: 'A password change needs your approval.',
    detail: 'Confirm your password change',
    icon: LockKeyhole,
  },
  suspicious: {
    label: 'Suspicious Activity',
    title: 'Unusual account activity',
    item: 'Security alert',
    amount: 'Review needed',
    notification: 'We noticed activity that needs your attention.',
    detail: 'Review unusual sign-in activity',
    icon: ShieldCheck,
  },
}

const timelineLabels = [
  'Transaction Initiated',
  'Risk Check Complete',
  'Additional Authorisation Required',
  'Member Approval Received',
  'Transaction Completed',
]

function WaterbucksMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`brand-mark ${small ? 'brand-mark--small' : ''}`} aria-label="Waterbucks">
      <span>W</span>
    </div>
  )
}

function App() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>('redemption')
  const [status, setStatus] = useState<FlowStatus>('idle')
  const [phoneScreen, setPhoneScreen] = useState<PhoneScreen>('home')
  const [notificationVisible, setNotificationVisible] = useState(false)
  const [balance, setBalance] = useState(25000)

  const scenario = scenarios[scenarioKey]
  const simulatedTime = useMemo(() => new Intl.DateTimeFormat('en-ZA', { hour: '2-digit', minute: '2-digit' }).format(new Date()), [status])
  const isRedemption = scenarioKey === 'redemption'

  useEffect(() => {
    if (status !== 'scanning') return
    const timer = window.setTimeout(() => {
      setStatus('approved')
      setBalance(15000)
      setPhoneScreen('authorise')
    }, 2300)
    return () => window.clearTimeout(timer)
  }, [status])

  function resetDemo() {
    setStatus('idle')
    setBalance(25000)
    setPhoneScreen('home')
    setNotificationVisible(false)
  }

  function initiateTransaction() {
    setStatus('pending')
    setNotificationVisible(true)
  }

  function openAuthorisation() {
    setNotificationVisible(false)
    setPhoneScreen('authorise')
  }

  function approve() {
    setStatus('scanning')
  }

  function reject() {
    setStatus('rejected')
    setNotificationVisible(false)
    setPhoneScreen('authorise')
  }

  const activeTimelineIndex = status === 'idle' ? -1 : status === 'pending' ? 2 : status === 'rejected' ? 2 : status === 'scanning' ? 3 : 4
  const statusLabel = status === 'idle' ? 'Ready to redeem' : status === 'pending' ? 'Pending authorisation' : status === 'scanning' ? 'Verifying identity' : status === 'approved' ? 'Approved' : 'Transaction rejected'

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <div className="topbar-brand"><WaterbucksMark small /><div><strong>Waterbucks</strong><span>by Pinnacle Rewards</span></div></div>
        <div className="topbar-actions"><span className="live-pill"><i /> Live demo</span><button className="reset-button" onClick={resetDemo}><RefreshCw size={15} /> Reset Demo</button><button className="menu-button" aria-label="Open menu"><Menu size={19} /></button></div>
      </header>

      <section className="intro-row">
        <div><p className="eyebrow"><span className="eyebrow-dot" /> SECURE TRANSACTION AUTHORISATION</p><h1>A safer way to move<br /><em>rewards forward.</em></h1><p className="intro-copy">See how the Waterbucks app turns a sensitive transaction into a trusted member moment.</p></div>
        <div className="scenario-control"><label htmlFor="scenario">Demo scenario</label><div className="select-wrap"><select id="scenario" value={scenarioKey} onChange={(event) => { setScenarioKey(event.target.value as ScenarioKey); resetDemo() }}>{Object.entries(scenarios).map(([key, value]) => <option value={key} key={key}>{value.label}</option>)}</select><ChevronDown size={16} /></div></div>
      </section>

      <section className="demo-grid">
        <div className="portal-panel panel-surface">
          <div className="panel-heading"><div className="portal-title"><div className="portal-icon"><ShieldCheck size={18} /></div><div><p className="panel-kicker">MEMBER PORTAL</p><h2>Waterbucks <span>Member Portal</span></h2></div></div><span className={`status-chip status-${status}`}><span /> {statusLabel}</span></div>
          <div className="member-strip"><div className="avatar">KM</div><div><p>Welcome back,</p><strong>Khetho Mngomezulu</strong><small>Member ID · WB-2026-001</small></div><div className="member-lock"><LockKeyhole size={15} /> Protected</div></div>
          <div className="balance-card"><div><span className="balance-label">AVAILABLE BALANCE</span><strong>{balance.toLocaleString()} <small>WB</small></strong><span className="balance-change">{status === 'approved' ? '− 10,000 WB redeemed' : 'Ready for your next reward'}</span></div><div className="balance-glyph"><Zap size={22} /></div></div>
          <div className="redemption-heading"><div><p className="panel-kicker">REWARD REDEMPTION</p><h3>Choose a reward</h3></div><span className="secure-badge"><ShieldCheck size={14} /> Secure</span></div>
          <div className={`reward-card ${status === 'pending' || status === 'scanning' ? 'reward-card--pending' : ''}`}><div className="reward-art"><Sparkles size={30} /><span>WB</span></div><div className="reward-content"><span className="reward-tag">PREMIUM REWARD</span><h3>{scenario.title}</h3><p>{isRedemption ? 'A little more luxury, ready when you are.' : 'This action needs a quick security check.'}</p><div className="reward-price"><strong>{scenario.amount}</strong><span>one-time authorisation</span></div></div><button className="redeem-button" onClick={initiateTransaction} disabled={status !== 'idle'}>{status === 'idle' ? 'Redeem now' : status === 'approved' ? 'Completed' : status === 'rejected' ? 'Rejected' : 'Awaiting approval'} <ArrowRight size={16} /></button></div>
          {status !== 'idle' && <div className={`alert-box alert-${status}`}>{status === 'approved' ? <CheckCircle2 size={18} /> : status === 'rejected' ? <XCircle size={18} /> : <ShieldCheck size={18} />}<div><strong>{status === 'approved' ? 'Transaction approved successfully' : status === 'rejected' ? 'The member rejected this transaction.' : status === 'scanning' ? 'Confirming your identity...' : 'Sensitive transaction detected'}</strong><span>{status === 'approved' ? 'Your reward is now on its way.' : status === 'rejected' ? 'No Waterbucks were deducted.' : 'This transaction requires additional authorisation.'}</span></div></div>}
          <div className="timeline"><div className="timeline-header"><h3>Transaction timeline</h3><span>{status === 'idle' ? 'Waiting to begin' : 'Live update'}</span></div>{timelineLabels.map((label, index) => { const complete = index < activeTimelineIndex || (status === 'approved' && index <= activeTimelineIndex); const current = index === activeTimelineIndex && status !== 'approved' && status !== 'rejected'; return <div className={`timeline-item ${complete ? 'is-complete' : ''} ${current ? 'is-current' : ''}`} key={label}><div className="timeline-node">{complete ? <Check size={12} /> : <span>{index + 1}</span>}</div><span>{label}</span>{current && <b>{status === 'pending' ? 'Waiting for approval' : status === 'scanning' ? 'In progress' : 'Current'}</b>}</div>})}</div>
        </div>

        <div className="phone-stage"><div className="phone-label"><span><span className="phone-label-dot" /> MEMBER APP</span><small>Simulated on device</small></div><div className="phone-frame"><div className="phone-island" /><div className="phone-screen"><div className="phone-status"><span>9:41</span><span>● ● ▰</span></div>{notificationVisible && <button className="notification-banner" onClick={openAuthorisation}><div className="notification-icon"><ShieldCheck size={17} /></div><div><strong>WATERBUCKS SECURITY</strong><span>{scenario.notification}</span><small>{scenario.detail}</small></div><ChevronDown size={15} /></button>}{phoneScreen === 'home' ? <div className="home-screen"><div className="app-nav"><div><span className="tiny-label">GOOD MORNING</span><strong>Khetho</strong></div><button className="app-bell" onClick={() => notificationVisible && openAuthorisation()}><Bell size={19} /><i /></button></div><div className="app-balance"><div className="app-balance-top"><span>Waterbucks balance</span><span className="app-live">● LIVE</span></div><strong>{balance.toLocaleString()} <small>WB</small></strong><span className="member-since">Member since 2024</span><div className="balance-wave"><span /><span /><span /></div></div><div className="qr-card"><div><span className="tiny-label">MEMBER PASS</span><strong>WB-2026-001</strong><small>Scan to earn or redeem</small></div><QrCode size={58} /></div><div className="phone-section-title"><strong>Recent activity</strong><span>View all</span></div><div className="activity-row"><div className="activity-icon"><Gift size={16} /></div><div><strong>Welcome bonus</strong><span>Today, 08:24</span></div><b>+2,500 WB</b></div><div className="activity-row"><div className="activity-icon pale"><ArrowDown size={16} /></div><div><strong>Partner purchase</strong><span>Yesterday, 15:02</span></div><b>+850 WB</b></div><div className="app-tabbar"><span className="active"><Zap size={16} /> Home</span><span><QrCode size={16} /> Pass</span><span><UserRound size={16} /> Profile</span></div></div> : <div className="authorise-screen"><button className="back-button" onClick={() => setPhoneScreen('home')}><ArrowDown size={17} /> <span>Waterbucks</span></button>{status === 'scanning' ? <div className="biometric-state"><div className="scan-ring"><Fingerprint size={54} /><span /></div><span className="tiny-label">SECURITY VERIFICATION</span><h2>Confirming your<br />identity...</h2><p>Keep your face in view</p><div className="scan-progress"><i /></div></div> : status === 'approved' ? <div className="approved-state"><div className="approved-check"><Check size={33} /></div><span className="tiny-label">IDENTITY CONFIRMED</span><h2>Transaction approved<br />successfully</h2><p>Your Premium Reward Voucher<br />is being prepared.</p><div className="approved-detail"><span>Amount</span><strong>10,000 WB</strong></div></div> : <><div className="security-heading"><div className="security-icon"><ShieldCheck size={22} /></div><span className="tiny-label">SECURITY VERIFICATION</span><h2>Approve this<br />transaction?</h2></div><div className="transaction-summary"><span>Transaction</span><strong>{scenario.title}</strong><span>Details</span><strong>{scenario.detail}</strong><span>Time</span><strong>{simulatedTime} · Today</strong></div>{status === 'rejected' && <div className="phone-rejected"><XCircle size={16} /> Transaction rejected</div>}<div className="auth-actions"><button className="approve-button" onClick={approve}><Check size={17} /> Approve</button><button className="reject-button" onClick={reject}><X size={17} /> Reject</button></div><span className="phone-footnote"><LockKeyhole size={12} /> Only you can authorise this action</span></>}</div>}</div><div className="phone-home-indicator" /></div><div className="phone-caption"><span className="caption-line" /><span>{status === 'idle' ? 'Your trusted rewards companion' : status === 'approved' ? 'Securely authorised in Waterbucks' : 'Notification + authorisation in one place'}</span><span className="caption-line" /></div></div>
      </section>

      <section className="why-section"><div className="section-heading"><p className="eyebrow"><span className="eyebrow-dot" /> THE BIGGER PICTURE</p><h2>Why this matters</h2><p>A dedicated app makes security feel like a natural part of the rewards experience.</p></div><div className="why-grid"><div className="why-copy"><div className="reason-list"><div><span>01</span><p><strong>Nothing happens automatically.</strong><br />Sensitive actions pause until the member says yes.</p></div><div><span>02</span><p><strong>The app becomes a trusted channel.</strong><br />A notification is useful. Authorisation is protection.</p></div><div><span>03</span><p><strong>Pinnacle Rewards owns the journey.</strong><br />The workflow can grow beyond the existing loyalty platform.</p></div></div><div className="use-case-row"><span>Works for more than redemptions</span>{['High-value rewards', 'New device login', 'Profile changes', 'Account recovery'].map((item) => <span className="use-case" key={item}>{item}</span>)}</div></div><div className="architecture"><div className="architecture-header"><span>THE TRUSTED FLOW</span><ShieldCheck size={17} /></div><div className="arch-flow"><div className="arch-node"><div className="arch-icon orange"><Zap size={17} /></div><strong>Transaction</strong></div><ArrowDown className="arch-arrow" size={16} /><div className="arch-node"><div className="arch-icon navy"><ShieldCheck size={17} /></div><strong>PR security rules</strong></div><ArrowDown className="arch-arrow" size={16} /><div className="arch-node"><div className="arch-icon mint"><Smartphone size={17} /></div><strong>Waterbucks app</strong></div><div className="arch-split"><span /><span>Approve / reject</span><span /></div><div className="arch-result"><CheckCircle2 size={18} /><strong>Transaction result</strong></div></div></div></div></section>
      <footer><span><WaterbucksMark small /> Waterbucks</span><span>Secure rewards, made human.</span><span>POC · 2026</span></footer>
    </main>
  )
}

export default App
