import { calculateSaju, solarToLunar } from '../lib/manseryeok.esm.js';

document.getElementById('sajuForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const year = parseInt(document.getElementById('year').value);
    const month = parseInt(document.getElementById('month').value);
    const day = parseInt(document.getElementById('day').value);
    const hour = parseInt(document.getElementById('hour').value);
    const minute = parseInt(document.getElementById('minute').value);
    const longitude = parseFloat(document.getElementById('longitude').value) || 127.0; // Default to Seoul longitude
    const gender = document.querySelector('input[name="gender"]:checked').value;

    console.log(`Calculating Saju for: ${year}-${month}-${day} ${hour}:${minute}, Long: ${longitude}, Gender: ${gender}`);

    try {
        // Validation check
        if (year < 1900 || year > 2050) {
            alert('연도는 1900년에서 2050년 사이여야 합니다.');
            return;
        }

        // Calculate Saju
        const saju = calculateSaju(year, month, day, hour, minute, {
            longitude: longitude,
            applyTimeCorrection: true
        });

        console.log('Saju Result:', saju);

        // Update DOM elements with results
        // Year Pillar (Nyeon-ju)
        setText('yearPillarHanja', saju.yearPillarHanja);
        setText('yearPillarHangul', saju.yearPillar);

        // Month Pillar (Wol-ju)
        setText('monthPillarHanja', saju.monthPillarHanja);
        setText('monthPillarHangul', saju.monthPillar);

        // Day Pillar (Il-ju)
        setText('dayPillarHanja', saju.dayPillarHanja);
        setText('dayPillarHangul', saju.dayPillar);

        // Hour Pillar (Si-ju)
        setText('hourPillarHanja', saju.hourPillarHanja);
        setText('hourPillarHangul', saju.hourPillar);

        // Additional Information
        const lunarRes = solarToLunar(year, month, day);
        setText('solarDate', `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`);
        setText('lunarDate', `${lunarRes.lunar.year}년 ${lunarRes.lunar.month}월 ${lunarRes.lunar.day}일 ${lunarRes.lunar.isLeapMonth ? '(윤달)' : '(평달)'}`);

        if (saju.isTimeCorrected && saju.correctedTime) {
            setText('timeCorrection', `${saju.correctedTime.hour}시 ${saju.correctedTime.minute}분 (진태양시 보정됨)`);
        } else {
            setText('timeCorrection', '보정 없음');
        }

        // Show the result section
        const resultSection = document.getElementById('resultSection');
        resultSection.classList.remove('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (error) {
        console.error('Saju Calculation Error:', error);
        alert('계산 중 오류가 발생했습니다: ' + error.message);
    }
});

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}
