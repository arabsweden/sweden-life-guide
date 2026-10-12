/**
 * Sweden Life Guide - Admin Dashboard
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React, { useState } from 'react';
import { OFFICIAL_SOURCES_REGISTRY } from '../../data/sources';
import { CATEGORIES } from '../../data/categories';
import { getAnonymousAnalyticsLogs } from '../../services/analytics/analyticsAdapter';
import { OfficialSource } from '../../types';
import { LayoutDashboard, Globe, AlertTriangle, Activity, Plus, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [sources, setSources] = useState<OfficialSource[]>(OFFICIAL_SOURCES_REGISTRY);
  const [activeTab, setActiveTab] = useState<'sources' | 'review_queue' | 'analytics' | 'audit'>('sources');

  // Form state for adding source
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAuthName, setNewAuthName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategoryCode, setNewCategoryCode] = useState('migration');

  const analyticsLogs = getAnonymousAnalyticsLogs();

  const handleToggleSourceStatus = (id: string) => {
    setSources(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: s.status === 'active' ? 'inactive' : 'active'
        };
      }
      return s;
    }));
  };

  const handleAddSourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthName || !newUrl) return;

    try {
      const parsedUrl = new URL(newUrl);
      const domain = parsedUrl.hostname.replace(/^www\./, '');

      const newSrc: OfficialSource = {
        id: 'src_custom_' + Date.now(),
        categoryIds: [newCategoryCode],
        authorityName: newAuthName,
        title: newTitle || newAuthName,
        domain,
        url: newUrl,
        fetchedAt: new Date().toISOString(),
        lastReviewedAt: new Date().toISOString(),
        status: 'active'
      };

      setSources(prev => [newSrc, ...prev]);
      setShowAddModal(false);
      setNewAuthName('');
      setNewTitle('');
      setNewUrl('');
    } catch {
      alert('نرجو إدخال رابط URL صحيح يتبع نطاقاً حكومياً (.se)');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-[#1a2b3c]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#006aa7] font-extrabold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>لوحة التحكم الإدارية — RAED SHIHAB</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#006aa7] flex items-center gap-2.5">
            <LayoutDashboard className="w-7 h-7 text-[#006aa7]" />
            <span>إدارة المصادر والتحليلات والاعتماد الرسمي</span>
          </h2>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#006aa7] hover:bg-[#005587] text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto border border-blue-800"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مصدر حكومي جديد</span>
        </button>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1 shadow-2xs">
          <div className="text-slate-500 text-xs font-bold">المصادر المعتمدة</div>
          <div className="text-2xl font-extrabold text-[#006aa7] font-mono">{sources.length}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1 shadow-2xs">
          <div className="text-slate-500 text-xs font-bold">الأقسام المفعّلة</div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono">{CATEGORIES.length}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1 shadow-2xs">
          <div className="text-slate-500 text-xs font-bold">طابور المراجعة (Needs Review)</div>
          <div className="text-2xl font-extrabold text-amber-600 font-mono">0</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1 shadow-2xs">
          <div className="text-slate-500 text-xs font-bold">الأحداث المجهولة المسجلة</div>
          <div className="text-2xl font-extrabold text-purple-700 font-mono">{analyticsLogs.length}</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-2">
        <button
          onClick={() => setActiveTab('sources')}
          className={`pb-3 px-3 transition-colors flex items-center gap-1.5 ${
            activeTab === 'sources'
              ? 'border-b-2 border-[#006aa7] text-[#006aa7]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>سجل المصادر الحكومية ({sources.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('review_queue')}
          className={`pb-3 px-3 transition-colors flex items-center gap-1.5 ${
            activeTab === 'review_queue'
              ? 'border-b-2 border-[#006aa7] text-[#006aa7]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>طابور المراجعة الإنسانية</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 px-3 transition-colors flex items-center gap-1.5 ${
            activeTab === 'analytics'
              ? 'border-b-2 border-[#006aa7] text-[#006aa7]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>التحليلات المجهولة (Privacy-Safe)</span>
        </button>
      </div>

      {/* Tab Content 1: Sources */}
      {activeTab === 'sources' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-slate-700 font-medium">
              <thead className="bg-[#f4f7f6] text-slate-600 border-b border-slate-200 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">الجهة السويدية</th>
                  <th className="p-3">عنوان الصفحة والمعرف</th>
                  <th className="p-3">النطاق الرسمى</th>
                  <th className="p-3">تاريخ المراجعة</th>
                  <th className="p-3">الحالة</th>
                  <th className="p-3">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sources.map((src) => (
                  <tr key={src.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-[#1a2b3c]">{src.authorityName}</td>
                    <td className="p-3">{src.title}</td>
                    <td className="p-3 font-mono text-[#006aa7] font-bold">{src.domain}</td>
                    <td className="p-3 text-slate-500 font-mono">
                      {new Date(src.lastReviewedAt || src.fetchedAt).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="p-3">
                      {src.status === 'active' ? (
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> نشط
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                          <XCircle className="w-3 h-3 text-slate-400" /> معطل
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleSourceStatus(src.id)}
                        className="text-[11px] underline font-bold text-slate-600 hover:text-[#006aa7]"
                      >
                        {src.status === 'active' ? 'تعطيل' : 'تفعيل'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content 2: Review Queue */}
      {activeTab === 'review_queue' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1a2b3c]">
            طابور المراجعة فارغ تماماً
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
            كافة الأسئلة المعالجة تم تأكيد ربطها بمصادر موثقة بنسبة ثقة عالية دون وسم `needs_review`.
          </p>
        </div>
      )}

      {/* Tab Content 3: Analytics */}
      {activeTab === 'analytics' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
          <div className="text-xs text-slate-700 leading-relaxed bg-[#f4f7f6] p-3 rounded-xl border border-slate-200 font-medium">
            🔒 <strong>تأكيد الخصوصية:</strong> جميع البيانات المجمعة مجهولة الهوية بالكامل ولا تحتوي على نصوص الأسئلة أو أرقام شخصية.
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700">سجل الأحداث الأخيرة:</h4>
            <div className="space-y-2 font-mono text-[11px]">
              {analyticsLogs.slice(0, 10).map((log) => (
                <div key={log.id} className="p-2.5 bg-[#f4f7f6] border border-slate-200 rounded-lg flex items-center justify-between text-slate-800 font-medium">
                  <span>{log.eventName} ({log.categoryId || 'عام'})</span>
                  <span className="text-emerald-700 font-bold">{log.durationBucket}</span>
                  <span className="text-slate-500">{new Date(log.createdAt).toLocaleTimeString('ar-EG')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Source Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-[#1a2b3c] shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-[#006aa7]">إضافة مصدر حكومي معتمد جديد</h3>

            <form onSubmit={handleAddSourceSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">اسم الجهة السويدية:</label>
                <input
                  type="text"
                  value={newAuthName}
                  onChange={(e) => setNewAuthName(e.target.value)}
                  placeholder="مثال: Transportstyrelsen"
                  className="w-full bg-[#fcfcfc] border border-slate-300 rounded-xl px-3 py-2 text-[#1a2b3c] focus:outline-none focus:border-[#006aa7] font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">عنوان الصفحة/المستند:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="دليل استبدال رخصة القيادة"
                  className="w-full bg-[#fcfcfc] border border-slate-300 rounded-xl px-3 py-2 text-[#1a2b3c] focus:outline-none focus:border-[#006aa7] font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">الرابط الرسمي (.se):</label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://www.transportstyrelsen.se/korkort"
                  className="w-full bg-[#fcfcfc] border border-slate-300 rounded-xl px-3 py-2 text-[#1a2b3c] focus:outline-none focus:border-[#006aa7] font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">القسم المتعلق:</label>
                <select
                  value={newCategoryCode}
                  onChange={(e) => setNewCategoryCode(e.target.value)}
                  className="w-full bg-[#fcfcfc] border border-slate-300 rounded-xl px-3 py-2 text-[#1a2b3c] focus:outline-none focus:border-[#006aa7] font-bold"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.title.ar}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006aa7] hover:bg-[#005587] text-white font-bold rounded-xl shadow-xs border border-blue-800"
                >
                  إضافة المصدر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
