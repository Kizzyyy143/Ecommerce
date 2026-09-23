import React from 'react';
import { ShieldCheck, Truck, Headphones, Award, Users, Heart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'គុណភាពស្តង់ដារ',
      desc: 'គ្រប់ផលិតផលទាំងអស់ត្រូវបានត្រួតពិនិត្យយ៉ាងហ្មត់ចត់ ដើម្បីធានាគុណភាពខ្ពស់បំផុត។',
    },
    {
      icon: Truck,
      title: 'ដឹកជញ្ជូនរហ័ស',
      desc: 'សេវាកម្មដឹកជញ្ជូនទូទាំងប្រទេស ប្រកបដោយទំនុកចិត្ត និងសុវត្ថិភាព។',
    },
    {
      icon: Headphones,
      title: 'សេវាកម្ម 24/7',
      desc: 'ក្រុមការងារប្រកបដោយវិជ្ជាជីវៈ រង់ចាំជួយដោះស្រាយរាល់ចម្ងល់របស់អ្នកគ្រប់ពេលវេលា។',
    },
    {
      icon: Award,
      title: 'ធានាត្រឹមត្រូវ',
      desc: 'មានគោលការណ៍ធានា និងប្តូរទំនិញងាយស្រួល ប្រសិនបើមានបញ្ហា។',
    },
  ];

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-900 to-slate-800 text-white py-14 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">អំពី KHMER STORE</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            បេសកកម្មរបស់យើងគឺផ្តល់ជូននូវបទពិសោធន៍ទិញទំនិញអនឡាញដ៏ល្អបំផុត និងទំនើបបំផុតនៅកម្ពុជា
          </p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-brand-600 font-bold text-sm uppercase tracking-wider">
                ប្រវត្តិ និងបេសកកម្ម
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-4 leading-snug">
                យើងបង្កើតឡើងដើម្បីបំពេញគ្រប់តម្រូវការរស់នៅប្រចាំថ្ងៃរបស់អ្នក
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
                KHMER STORE គឺជាវេទិកាពាណិជ្ជកម្មអេឡិចត្រូនិចឈានមុខគេមួយនៅកម្ពុជា ដែលផ្តោតសំខាន់លើការផ្តល់ជូនផលិតផលសម្បូរបែប ចាប់ពីគ្រឿងអេឡិចត្រូនិច ម៉ូដសម្លៀកបំពាក់ រហូតដល់គ្រឿងបន្លាស់ទំនើបៗ។
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                យើងរួមបញ្ចូលបច្ចេកវិទ្យាទូទាត់ប្រាក់ជាតិ KHQR របស់ធនាគារជាតិនៃកម្ពុជា ដើម្បីផ្តល់ភាពងាយស្រួល រហ័ស និងមានសុវត្ថិភាពខ្ពស់ដល់អតិថិជនទាំងអស់។
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                alt="Khmer Store Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              គុណតម្លៃចម្បងរបស់យើង
            </h2>
            <p className="text-slate-500 text-sm">
              អ្វីដែលធ្វើឱ្យ KHMER STORE ក្លាយជាជម្រើសទីមួយរបស់អតិថិជន
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm feature-card text-center"
                >
                  <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-2">{v.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
