import React from 'react';
import { useI18n } from '../i18n/useI18n.jsx';

export default function DataSources({ provenance = [] }) {
  const { t } = useI18n();

  if (!provenance || provenance.length === 0) return null;

  return (
    <section 
      className="bg-[#FFFFFF] border border-[#E4DDD0] rounded-2xl p-4 sm:p-6 shadow-sm"
      aria-labelledby="data-sources-title"
    >
      <div className="mb-4">
        <h2 id="data-sources-title" className="text-lg sm:text-xl font-bold text-[#1C2B20]">
          {t('dataSourcesTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-[#526356] mt-0.5">
          {t('dataSourcesSubtitle')}
        </p>
      </div>

      <div className="overflow-x-auto border border-[#DDD6C8] rounded-xl">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead className="bg-[#FAF8F5] text-[#526356] font-semibold border-b border-[#DDD6C8]">
            <tr>
              <th className="py-2.5 px-3.5">{t('datasetCol')}</th>
              <th className="py-2.5 px-3.5">{t('productCol')}</th>
              <th className="py-2.5 px-3.5">{t('versionCol')}</th>
              <th className="py-2.5 px-3.5">{t('retrievedCol')}</th>
              <th className="py-2.5 px-3.5 text-right">{t('viewSource')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFE9DF]">
            {provenance.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                <td className="py-3 px-3.5 font-bold text-[#1C2B20]">
                  {item.dataset}
                </td>
                <td className="py-3 px-3.5 text-[#526356]">
                  {item.product}
                </td>
                <td className="py-3 px-3.5 text-[#526356] font-mono text-xs">
                  {item.version}
                </td>
                <td className="py-3 px-3.5 text-[#526356]">
                  {item.retrieved}
                </td>
                <td className="py-3 px-3.5 text-right">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#2E5E3E] hover:underline font-semibold text-xs"
                  >
                    <span>NASA</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h4a.75.75 0 010 1.5h-4z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
