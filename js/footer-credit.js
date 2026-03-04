document.addEventListener('DOMContentLoaded', () => {
  const isMobileView = window.matchMedia('(max-width: 640px)').matches;
  const footer = document.querySelector('footer');
  if (!footer || footer.querySelector('.sparkwhiz-credit')) {
    return;
  }

  const footerContainer = footer.querySelector('.mx-auto.max-w-6xl') || footer;
  const creditWrapper = document.createElement('p');
  creditWrapper.className = 'sparkwhiz-credit text-right';
  creditWrapper.style.color = '#9ca3af';
  creditWrapper.style.margin = '0';
  creditWrapper.style.fontSize = isMobileView ? '10px' : '11px';
  creditWrapper.style.lineHeight = '1.2';
  creditWrapper.style.whiteSpace = isMobileView ? 'normal' : 'nowrap';
  creditWrapper.style.textAlign = 'right';
  creditWrapper.style.marginLeft = 'auto';
  creditWrapper.style.maxWidth = isMobileView ? '58%' : 'none';

  const link = document.createElement('a');
  link.href = 'https://www.sparkwhizinfotech.com';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.style.color = 'inherit';
  link.style.textDecoration = 'none';
  link.innerHTML = 'Built with <span style="color:#ef4444;">♥</span> by SparkWhiz Infotech';

  link.addEventListener('mouseenter', () => {
    link.style.color = '#ffffff';
  });

  link.addEventListener('mouseleave', () => {
    link.style.color = 'inherit';
  });

  creditWrapper.appendChild(link);

  const copyrightBlock = footer.querySelector('.border-t.border-gray-800.pt-8.text-center');
  if (copyrightBlock) {
    const copyrightText = copyrightBlock.querySelector('p');
    copyrightBlock.style.display = 'flex';
    copyrightBlock.style.justifyContent = 'space-between';
    copyrightBlock.style.alignItems = isMobileView ? 'flex-start' : 'center';
    copyrightBlock.style.textAlign = 'left';
    copyrightBlock.style.gap = '12px';
    copyrightBlock.style.flexWrap = 'wrap';

    if (copyrightText) {
      copyrightText.style.margin = '0';
      copyrightText.style.textAlign = 'left';
      copyrightText.style.whiteSpace = isMobileView ? 'normal' : 'nowrap';
      copyrightText.style.flex = '1 1 220px';
    }

    copyrightBlock.appendChild(creditWrapper);
  } else {
    footerContainer.appendChild(creditWrapper);
  }
});
