(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["itpass:1"] = {
    en: {
      title: "1-01 Information Theory",
      concept: "Information is represented in two main ways: **Analog**, which consists of continuously changing values (without breaks, like the height of a slide), and **Digital**, which divides continuous values into discrete, discontinuous numerical values of 0s and 1s. Digital data has the advantage of being easy to process and edit, highly resistant to noise, and less prone to degradation.\n\n**Why do computers use digital (binary)?**\nElectronic circuits in computers can only distinguish between two states: \"ON (high voltage)\" and \"OFF (low voltage)\". Therefore, representing all information as combinations of 0s and 1s (digital) is the most reliable method with the fewest errors.\n\nThe smallest unit of information is a **bit** (representing either 0 or 1), and a group of 8 bits is called a **Byte**. Auxiliary units for representing large capacities include **KB** (10^3), **MB** (10^6), **GB** (10^9), **TB** (10^12), and **PB** (10^15). To prepare for the exam, make sure you memorize the order of these units and the calculation rule that 1 Byte equals 8 bits.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:1:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:2"] = {
    en: {
      title: "1-02 Computer Architecture and CPU",
      concept: "Computers consist of basic components known as the **Five Core Devices**:\n\n1. **Input Device**: Devices used to input information, such as keyboards and mice.\n2. **Output Device**: Devices used to output information, such as displays and printers.\n3. **Memory/Storage Device**: Devices used to store programs and data (divided into main memory and auxiliary storage).\n4. **Control Device**: Devices that interpret instructions and issue commands to other components.\n5. **Arithmetic Logic Device**: Devices that perform arithmetic and logical operations.\n\nAmong these, the chip that integrates the control device and the arithmetic logic device is the **CPU (Central Processing Unit)**, which acts as the \"brain\" of the computer.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:2:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:3"] = {
    en: {
      title: "1-02-1 CPU Performance Metrics",
      concept: "**CPU Performance Metrics:**\n- **Clock Frequency**: The number of electrical signals generated per second (Hz). The higher the value, the faster the processing speed.\n- **CPI (Cycles Per Instruction)**: The number of clock cycles required to execute a single instruction. The lower the value, the better the processing efficiency.\n- **Multi-core Processor**: A single CPU package that contains multiple processing \"cores\". Parallel processing improves the overall performance and capabilities.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:3:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:4"] = {
    en: {
      title: "1-03 Main Memory and Auxiliary Storage",
      concept: "Storage devices are classified into **Main Memory** (RAM), which the CPU reads from and writes to directly, and **Auxiliary Storage** (such as HDDs and SSDs), which permanently stores large amounts of data.\n\n**Difference between Main Memory and Auxiliary Storage (For beginners):**\nMain memory is like your \"desk space.\" The larger the desk, the more documents you can open and work on at the same time, but when you turn off the power, the desk is cleared (volatile). Auxiliary storage is like a \"file cabinet or bookshelf.\" It takes more time to retrieve a book, but the contents remain even when the power is turned off (non-volatile).\n\n**Role of Cache Memory:**\nThe processing speed of a CPU is extremely fast, but the read/write speed of main memory is relatively slow, causing the CPU to wait (idle loss). Therefore, small-capacity but super-fast **Cache Memory** is placed between the CPU and main memory. By copying frequently used data here, it reduces access to main memory and speeds up the entire system.\n\nThe probability that the data required by the CPU exists in the cache memory is called the **Hit Rate**. The higher the hit rate, the shorter the effective access time.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:4:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:5"] = {
    en: {
      title: "1-04 Semiconductor Memory",
      concept: "Semiconductor memory is classified into **Volatile Memory**, where stored data is lost when power is turned off, and **Non-volatile Memory**, which retains its contents even without power.\n\n**1. RAM (Random Access Memory) - Volatile:**\n- **DRAM (Dynamic RAM)**: Stores information by accumulating electrical charges in capacitors. Since charges leak over time, a **Refresh Operation** to re-energize the memory is essential to maintain data. It is cheap and can be made in large capacities, so it is used as PC's **Main Memory**.\n- **SRAM (Static RAM)**: Stores information using electrical circuits called flip-flops. It does not require refresh operations and is significantly faster than DRAM, but it is structurally complex, expensive, and has small capacities. It is used for **Cache Memory**.\n\n**2. ROM (Read Only Memory) - Non-volatile:**\n- **Flash Memory**: A type of non-volatile memory that can be electrically rewritten. Because it has no moving parts and is resistant to physical shocks, it is widely used in SSDs, USB flash drives, SD cards, and smartphone storage.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:5:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:6"] = {
    en: {
      title: "1-05 Input/Output Devices",
      concept: "Input and output devices are hardware interfaces used to exchange information between the computer main unit and the external world.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:6:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:7"] = {
    en: {
      title: "1-05-1 1. Input Devices",
      concept: "**1. Input Devices:**\nIn addition to keyboards and mice, these include **Scanners** for reading images, **Touch Panels** for specifying positions with a finger, and **Barcode Readers** for reading product codes.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:7:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:8"] = {
    en: {
      title: "1-05-2 2. Output Devices",
      concept: "**2. Output Devices:**\n- **Liquid Crystal Display (LCD)**: Displays screens by blocking or transmitting light from a backlight using liquid crystal elements.\n- **Organic EL Display (OLED)**: Uses special organic compounds (elements) that emit light when voltage is applied. Since no backlight is required, it can be made much **Thinner** than LCDs, allowing for true black representation (high contrast ratio) and fast response speeds.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:8:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:9"] = {
    en: {
      title: "1-05-3 3. Resolution Units",
      concept: "**3. Resolution Units:**\n**dpi** (dots per inch) is used as an index to represent the resolution of screens and printing. It indicates the number of dots (points) arranged per inch (approx. 2.54 cm). The larger the value, the higher the resolution and the more beautiful the display.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:9:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:10"] = {
    en: {
      title: "1-06 Input/Output Interfaces",
      concept: "Input/Output interfaces are general terms for standards and connectors used to connect the computer unit to peripheral devices (such as keyboards, printers, and external HDDs).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:10:conceptJa"
    }
  };
})();
