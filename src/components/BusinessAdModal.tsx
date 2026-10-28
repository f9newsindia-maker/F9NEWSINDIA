import React, { useState } from 'react';
import { DollarSign, MessageCircle, Send, CheckCircle, Smartphone, Globe, Video, TrendingUp, X } from 'lucide-react';
import { F9Logo } from './F9Logo';

interface BusinessAdModalProps {
  onClose: () => void;
}

export const BusinessAdModal: React.FC<BusinessAdModalProps> = ({ onClose }) => {
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('ऐप व वेबसाइट बैनर विज्ञापन');
  const [budget, setBudget] = useState('₹5,000 - ₹20,000');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !phone) {
      alert('कृपया व्यापार का नाम और मोबाइल नंबर दर्ज करें।');
      return;
    }

    // Direct WhatsApp message formatting for instant conversion
    const message = `*F9NEWSINDIA विज्ञापन पूछताछ (Business Ad Inquiry)*\n\nव्यापार का नाम: ${businessName}\nसंपर्क व्यक्ति: ${contactName || 'N/A'}\nमोबाइल नंबर: ${phone}\nइच्छित सेवा: ${serviceType}\nअनुमानित बजट: ${budget}\nविवरण: ${details || 'शीघ्र संपर्क करें'}`;

    window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${encodeURIComponent(message)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-7 my-auto text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white">
              F9NEWSINDIA डिजिटल विज्ञापन एवं मार्केटिंग सेवाएँ
            </h3>
            <p className="text-xs text-slate-400">
              लाखों पाठकों और दर्शकों तक अपने व्यापार, दुकान या सेवा का प्रचार पहुँचाएं
            </p>
          </div>
        </div>

        {/* Services Offerings Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <Smartphone className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <h5 className="text-[11px] font-bold text-white">ऐप बैनर विज्ञापन</h5>
            <span className="text-[10px] text-slate-400">दैनिक टॉप स्लॉट</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <Globe className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <h5 className="text-[11px] font-bold text-white">प्रायोजित लेख (Sponsored)</h5>
            <span className="text-[10px] text-slate-400">SEO एवं ब्रांड स्टोरी</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <Video className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <h5 className="text-[11px] font-bold text-white">YouTube वीडियो प्रचार</h5>
            <span className="text-[10px] text-slate-400">शॉर्ट्स व लाइव टीवी</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <h5 className="text-[11px] font-bold text-white">लोकल बिजनेस ग्रोथ</h5>
            <span className="text-[10px] text-slate-400">जिला स्तर पर टार्गेटिंग</span>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center bg-slate-950 rounded-2xl border border-emerald-500/40">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-base font-bold text-white">पूछताछ दर्ज कर ली गई है!</h4>
            <p className="text-xs text-slate-300 mt-1">
              F9 विज्ञापन टीम शीघ्र ही आपसे संपर्क करेगी।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  व्यापार / संस्था का नाम *
                </label>
                <input
                  type="text"
                  placeholder="उदा. श्री गणेश ज्वेलर्स या मॉडर्न स्कूल"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  मोबाइल नंबर (WhatsApp) *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  इच्छित विज्ञापन सेवा
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                >
                  <option value="ऐप व वेबसाइट बैनर विज्ञापन">ऐप व वेबसाइट बैनर विज्ञापन</option>
                  <option value="प्रायोजित समाचार आलेख (Sponsored Article)">प्रायोजित समाचार आलेख</option>
                  <option value="YouTube वीडियो एड / शॉर्ट्स प्रमोशन">YouTube वीडियो एड / शॉर्ट्स प्रमोशन</option>
                  <option value="सोशल मीडिया पैकेज (All Platforms)">सोशल मीडिया पैकेज</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  अनुमानित बजट
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                >
                  <option value="₹2,500 - ₹5,000 (शुरुआती पैकेज)">₹2,500 - ₹5,000 (शुरुआती)</option>
                  <option value="₹5,000 - ₹20,000 (मानक पैकेज)">₹5,000 - ₹20,000 (मानक)</option>
                  <option value="₹20,000+ (प्रीमियम राज्यव्यापी)">₹20,000+ (प्रीमियम)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                विज्ञापन संबंधी अतिरिक्त विवरण (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="आप क्या प्रचारित करना चाहते हैं..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp पर तुरंत रेट कार्ड व ऑफर पाएं
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
