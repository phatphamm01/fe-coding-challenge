export const saveTemplateAsFile = (
  filename: string,
  dataObjToWrite: Record<any, any>
) => {
  const blob = new Blob([JSON.stringify(dataObjToWrite)], {
    type: 'text/json'
  });
  const link = document.createElement('a');

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });

  link.dispatchEvent(evt);
  link.remove();
};

export const getJsonToFile = () => {
  return new Promise(async (resolve, reject) => {
    const file = await getFile();
    const json = await fileToJson(file);

    resolve(json);
  });
};

export const getFile = (): Promise<File> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.addEventListener('change', async (e) => {
      //@ts-ignore
      if (!e?.target?.files?.[0]) return;

      const file = (e.target as any).files?.[0];

      resolve(file);
    });

    input.click();
  });
};

export const fileToJson = (file: File) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      let str = event?.target?.result as any;
      let json = JSON.parse(str);

      resolve(json);
    };

    reader.readAsText(file);
  });
};
