/* ── i18n ────────────────────────────────────────────── */
const _I18N = {
  tr: {
    'nav.cmdb':          'Detay arama',
    'nav.dailycheck':    'Günlük Kontrol',
    'nav.section.infra': 'Altyapı',
    'nav.sub.virt':      'Sanallaştırma',
    'nav.sub.monitor':   'İzleme',
    'nav.sub.dataprot':  'Veri Koruma',
    'nav.vcenter':       'vCenter',
    'nav.physical':      'Fiziksel Mimari',
    'nav.vmhost':        'VM-Host Eşleme',
    'nav.zerto':         'Zerto',
    'nav.delinea':       'Delinea PAM',
    'nav.itanalytics':   'IT Analytics',
    'nav.netbackup':     'NetBackup',
    'nav.rvtools':       'RVTools',
    'nav.capacity':      'Kapasite Trend Analizi',
    'nav.section.mgmt':  'Yönetim',
    'nav.licenses':      'Lisans Yönetimi',
    'nav.operations':    'Operasyon',
    'nav.calculator':    'Teklifler',
    'nav.jobs':          'Zamanlanmış Görevler',
    'nav.section.reports': 'Raporlar',
    'nav.reports':       'Raporlar',
    'nav.finops':        'Maliyet Optimizasyonu',
    'nav.admin':         'Admin Panel',
    'user.role.admin':   'Yönetici',
    'user.role.user':    'Kullanıcı',
    'user.menu.settings':'Kullanıcı Ayarları',
    'user.menu.theme':   'Görünüm',
    'user.menu.logout':  'Çıkış Yap',
    'usrset.title':      'Kullanıcı Ayarları',
    'usrset.sub':        'Dil, saat dilimi ve tema tercihlerinizi buradan değiştirebilirsiniz.',
    'usrset.saved':      'Ayarlarınız kaydedildi.',
    'usrset.lang.title': 'Dil / Language',
    'usrset.theme.title':'Tema',
    'usrset.theme.light':'Açık',
    'usrset.theme.dark': 'Koyu',
    'usrset.theme.auto': 'Sistem',
    'usrset.tz.title':   'Saat Dilimi',
    'usrset.save':       'Kaydet',
    'usrset.cancel':     'İptal',
  },
  en: {
    'nav.cmdb':          'Detailed Search',
    'nav.dailycheck':    'Daily Check',
    'nav.section.infra': 'Infrastructure',
    'nav.sub.virt':      'Virtualization',
    'nav.sub.monitor':   'Monitoring',
    'nav.sub.dataprot':  'Data Protection',
    'nav.vcenter':       'vCenter',
    'nav.physical':      'Physical Architecture',
    'nav.vmhost':        'VM-Host Mapping',
    'nav.zerto':         'Zerto',
    'nav.delinea':       'Delinea PAM',
    'nav.itanalytics':   'IT Analytics',
    'nav.netbackup':     'NetBackup',
    'nav.rvtools':       'RVTools',
    'nav.capacity':      'Capacity Trend Analysis',
    'nav.section.mgmt':  'Management',
    'nav.licenses':      'License Management',
    'nav.operations':    'Operations',
    'nav.calculator':    'Quotes',
    'nav.jobs':          'Scheduled Jobs',
    'nav.section.reports': 'Reports',
    'nav.reports':       'Reports',
    'nav.finops':        'Cost Optimization',
    'nav.admin':         'Admin Panel',
    'user.role.admin':   'Administrator',
    'user.role.user':    'User',
    'user.menu.settings':'User Settings',
    'user.menu.theme':   'Appearance',
    'user.menu.logout':  'Sign Out',
    'usrset.title':      'User Settings',
    'usrset.sub':        'Change your language, timezone and theme preferences here.',
    'usrset.saved':      'Your settings have been saved.',
    'usrset.lang.title': 'Language',
    'usrset.theme.title':'Theme',
    'usrset.theme.light':'Light',
    'usrset.theme.dark': 'Dark',
    'usrset.theme.auto': 'System',
    'usrset.tz.title':   'Timezone',
    'usrset.save':       'Save',
    'usrset.cancel':     'Cancel',
  },
};

function applyI18n(lang) {
  const dict = _I18N[lang] || _I18N.tr;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.documentElement.lang = lang === 'en' ? 'en' : 'tr';
}

function toggleSidebar() {
  const s = document.getElementById('sidebar');
  if (s) s.style.width = s.style.width === '0px' ? '' : '0px';
}

async function runScript(name) {
  try {
    const res = await fetch(`/api/run/${name}`, { method: 'POST' });
    const data = await res.json();
    console.log('Script çıktısı:', data);
  } catch (e) {
    console.error('Script hatası:', e);
  }
}
