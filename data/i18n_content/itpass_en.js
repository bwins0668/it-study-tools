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

  window.CONTENT_I18N["itpass:11"] = {
    en: {
      title: "1-06-1 1. Wired Interfaces",
      concept: "**1. Wired interface:**\n- **USB (Universal Serial Bus)**: The most typical serial transfer (method of sending data one bit at a time in one lane) interface. Up to **127 units** can be connected via a USB hub, and it has **Hot Plug** functionality that allows you to connect and remove cables while the PC is turned on, and **Bus Power** functionality that supplies power to peripheral devices through the cable.\n- **HDMI (High-Definition Multimedia Interface)**: A standard that transmits digital video signals and digital audio signals together over a single cable. Widely used in TVs and PC monitors.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:11:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:12"] = {
    en: {
      title: "1-06-2 2. Wireless Interfaces",
      concept: "**2. Wireless interface:**\n- **Bluetooth**: A short-range wireless communication standard that connects peripheral devices such as keyboards, mice, and earphones cordlessly within a narrow range of several meters to several tens of meters in radius.\n- **Wi-Fi**: A communication standard for connecting PCs and smartphones to the Internet (LAN) wirelessly.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:12:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:13"] = {
    en: {
      title: "1-07 AI",
      concept: "Machine learning and deep learning are the technologies that support the development of artificial intelligence (AI).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:13:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:14"] = {
    en: {
      title: "1-07-1 1. Machine Learning",
      concept: "**1. Machine Learning:**\nThis is a method of feeding a large amount of data (big data) to a computer and having it autonomously learn the patterns and rules hidden in the data. There are three learning methods:\n- **Supervised learning**: Input data and \"correct answer (label)\" are given as a set for learning. For example, we add the correct tag \"cat\" to an image (**annotation**) and let the AI ​​learn from it. It is used for automatic classification of spam emails, etc.\n- **Unsupervised learning**: Analyzes the characteristics of the data itself and divides the data into groups (clustering) without giving correct answers. It is used to analyze customer purchasing behavior patterns.\n- **Reinforcement learning**: The AI ​​itself repeats trial and error, and by giving a \"reward (score)\" to the best behavior, it learns the optimal behavior pattern. It is used in AI for Go and Shogi, and in autonomous driving.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:14:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:15"] = {
    en: {
      title: "1-07-2 2. Deep learning",
      concept: "**2. Deep learning:**\nIt is an advanced machine learning technology in which a computer deeply analyzes and learns the characteristics of data on its own by layering multiple (deep) layers of **neural networks** that mimic the structure of nerve cells (neurons) in the human brain.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:15:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:16"] = {
    en: {
      title: "1-08 Probability and Statistics",
      concept: "These are indicators of representative values ​​and dispersion that form the basis of data analysis and management decision-making.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:16:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:17"] = {
    en: {
      title: "1-08-1 1. Representative Values",
      concept: "**1. Representative value indicating the center of data:**\n- **Average value**: Value obtained by dividing the sum of all numerical values by the number of data items. There is a weakness that is easily affected by extremely large or small values ​​(outliers).\n- **Median**: The value located exactly in the middle when data is arranged in order of size. If there is an even number, the average of the two central values ​​will be used. Its strength is that it is less susceptible to outliers.\n- **Mode**: The value that appears most frequently in the data.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:17:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:18"] = {
    en: {
      title: "1-08-2 2. Measures of Dispersion",
      concept: "**2. Indicator showing data dispersion (dispersion):**\n- **Dispersion**: Average value of how far each piece of data is from the average value. The higher the value, the more dispersion in the data.\n- **Standard deviation**: The square root of the variance. It is easy to handle because the units match the original data, and is also used to calculate the \"deviation value\" for entrance exams.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:18:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:19"] = {
    en: {
      title: "1-09 Radix Conversion (Base Conversion)",
      concept: "Inside a computer, all numbers are processed in binary numbers, 0 and 1, but to make it easier for humans to understand, decimal numbers and hexadecimal numbers, which are shortened versions of binary numbers, are used.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:19:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:20"] = {
    en: {
      title: "1-09-1 1. Characteristics of Number Systems",
      concept: "**1. Characteristics of each number system:**\n- **Decimal number**: A number system that we use every day, using 10 characters from 0 to 9, and increasing by 10.\n- **Binary number**: A number system that uses only two characters, 0 and 1, and increases by 2. Starting from the right end, they are \"2^0 digit (1's digit)\", \"2^1 digit (2's digit)\", \"2^2 digit (4's digit)\", \"2^3 digit (8's digit)\".\n- **Hexadecimal number**: A number system that uses a total of 16 characters, 0 to 9 and A to F (A=10, B=11, C=12, D=13, E=14, F=15) representing 10 to 15, and carries up by 16. Four digits in binary can be represented by one digit in hexadecimal, so it is often used to represent computer memory.",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:20:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:21"] = {
    en: {
      title: "1-09-2 2. Decimal to Binary Conversion",
      concept: "**2. Conversion from decimal to binary (Sudare calculation):**\nContinue to divide the decimal number by \"2\" and arrange the remainders in order from the bottom. To prepare for the exam, let's practice quickly doing simple back calculations from binary numbers to decimal numbers (multiplying and adding the weight of each digit).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:21:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:22"] = {
    en: {
      title: "2-01 Software",
      concept: "Software is broadly divided into \"System Software (OS),\" \"Application Software,\" and \"middleware,\" which is located in between, depending on its role.\n\n**1. Basic software (OS - Operating System):**\nIt is the software that operates the hardware and is the foundation of all software, such as input from the keyboard, output to the screen, and memory management. Windows, macOS, Linux, iOS, Android, etc.\n\n**2. Applied software (application):**\nSoftware that allows users to perform specific purposes (work or entertainment), such as document creation (Word), spreadsheets (Excel), and web browsers.\n\n**3. OSS (Open Source Software):**\nIt is software whose source code (program blueprint) is publicly available free of charge, and anyone can freely use, improve, and redistribute it. Commercial use is possible as long as you follow the license rules.\n- **Representative OSS**: Linux (OS), Apache (web server), MySQL/PostgreSQL (database), Android (mobile OS), etc.\n- **Non-OSS**: Windows, Microsoft Office (commercial license with source not disclosed).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:22:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:23"] = {
    en: {
      title: "2-02 File Management and Paths",
      concept: "The OS manages data in units called **files**, and the folders that classify files are called **directories**. The directory has a hierarchical structure (tree structure).\n\nThere are two expressions to indicate the location of a file:\n1. **Absolute path**: A method in which everything is written starting from the top layer root directory.\n2. **Relative path**: A method of writing starting from the current directory (one level higher is represented by \"..\").\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:23:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:24"] = {
    en: {
      title: "2-03 Backup Strategies",
      concept: "Backing up data is double-storing data in case of equipment failure or data corruption.\n\n1. **Full Backup**: Back up all target data every time. Recovery is the quickest, but it takes time.\n2. **Differential backup**: Backs up the data that has changed since the first full backup every time.\n3. **Incremental backup**: Back up only the portion that has increased since the previous backup (regardless of type). Although the time is short, recovery is complicated.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:24:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:25"] = {
    en: {
      title: "2-04 Spreadsheets: Relative and Absolute References",
      concept: "When copying (dragging) formulas to other cells in spreadsheet software (Excel, etc.), specify the rules for moving the referenced cells.\n\n1. **Relative reference**: The position of the referenced cell is automatically moved according to the direction in which the formula is copied (e.g. `A1`).\n2. **Absolute Reference**: Always refer to a specific cell no matter where you copy the formula. Add `$` before the row number or column number (e.g. `$A$1`).\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:25:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:26"] = {
    en: {
      title: "2-05 Spreadsheets: Basic Functions",
      concept: "This function allows you to easily perform complex calculations using spreadsheet software. The basic functions that frequently appear in the IT Passport exam are as follows.\n\n- **SUM**: Calculate the sum of the numbers in the specified range.\n- **AVERAGE**: Calculate the average value of the numerical values ​​in the specified range.\n- **MAX / MIN**: Find the maximum / minimum value of the specified range.\n- **IF**: \"IF (condition, if true, if false)\" changes the output value depending on whether the condition is met or not.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:26:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:27"] = {
    en: {
      title: "2-06 Spreadsheets: Advanced Functions",
      concept: "This is an applied function used for practical data extraction.\n\n- **VLOOKUP**: Searches another table vertically based on the specified key and retrieves the specified data of the matching row. Specify something like \"VLOOKUP(search value, range, column number, search method)\".\n- **HLOOKUP**: Search another table horizontally.\n- **CONCAT (CONCATENATE)**: Combine multiple strings into one.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:27:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:28"] = {
    en: {
      title: "2-07 User Interfaces (UI/UX)",
      concept: "A system for exchanging information between a user and a computer.\n\n1. **GUI**: An intuitive operation screen that allows you to operate visually using icons and a mouse.\n2. **CUI**: A screen that is operated by entering text commands from the keyboard.\n3. **Related indicators**: **Usability** refers to the ease of use, **UX (User Experience)** refers to the experiential value obtained through a product, and **Universal Design** refers to designing products that are easy to use for anyone regardless of age or disability.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:28:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:29"] = {
    en: {
      title: "2-08 Multimedia",
      concept: "A technology that handles multiple media such as images, audio, and videos as digital data.\n\n1. **Still image format**: **JPEG** (for photos, lossy compression), **PNG** (for illustrations, transparent, lossless compression), **GIF** (256 colors, animation possible).\n2. **Video format**: **MP4** (widely popular for Internet distribution).\n3. **Audio format**: **MP3** (compressed by cutting out parts that are difficult for the human ear to hear), **MIDI** (a standard that records performance information and score data, but does not contain the sound itself).\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:29:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:30"] = {
    en: {
      title: "3-01 System Architectures",
      concept: "This is the form of system installation and operation.\n\n1. **Client-server system**: A configuration that is divided into a \"client\" that requests processing and a \"server\" that provides processing.\n2. **Cloud computing**: A form of using resources such as virtual servers only as needed via the Internet. Service delivery models include **SaaS** (app provision), **PaaS** (development platform), and **IaaS** (virtual infrastructure).\n3. **Grid computing**: A form of connecting a large number of computers on a network and running them as a virtual ultra-high performance computer.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:30:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:31"] = {
    en: {
      title: "3-02 High Availability Configurations",
      concept: "This is a configuration technology that increases the fault tolerance of the system.\n\n1. **Duplex system**: Prepare a production machine and a spare machine. The state in which a standby device can be activated immediately (standby) is called **Hot Standby**, and the preparation state such as turning off the power is called **Cold Standby**.\n2. **Dual System**: Two computers always perform the same process at the same time and collate the results. The safest, but costly.\n3. **RAID**: Multiple disk combination technology. **RAID 0** (striping: faster speed with distributed writing, no fault tolerance), **RAID 1** (mirroring: double writing of the same data), **RAID 5** (parity distributed recording).\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:31:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:32"] = {
    en: {
      title: "3-03 System Reliability (Availability)",
      concept: "This is an evaluation index that shows the percentage of systems that continue to operate without failure.\n\n- **MTBF**: Mean failure-free time (operating time between failures. The longer the better).\n- **MTTR**: Mean repair time (time taken to repair. The shorter the better).\n- **Operating rate (availability)**: Probability that the system is operating normally. The formula is:\n  `Occupancy rate = MTBF / (MTBF + MTTR)`\n- **Series connection**: Two devices must both work. Overall utilization rate = `R1 × R2`\n- **Parallel connection**: Only one can work. Overall utilization = `1 - (1 - R1) × (1 - R2)`\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:32:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:33"] = {
    en: {
      title: "3-04 System Performance Evaluation",
      concept: "This is a standard for objectively evaluating system performance.\n\n1. **Response time**: The time from when the user sends an instruction until the system returns the first response.\n2. **Throughput**: The amount of work that a system can process per unit time (processing capacity).\n3. **Benchmark test**: A test that measures and compares the effective speed of a system by running a standard measurement program.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:33:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:34"] = {
    en: {
      title: "3-05 IoT and Embedded Systems",
      concept: "1. **Embedded system**: A dedicated computer system built into home appliances, automobiles, etc. that performs specific controls. Real-time performance is required.\n2. **IoT system**: Technology that connects things to the Internet. It consists of a **sensor** that detects physical information, and an **actuator** that physically operates in response to a control signal.\nA configuration that reduces communication delays by performing primary processing near the terminal is called **edge computing**.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:34:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:35"] = {
    en: {
      title: "3-06 IT Solutions and Outsourcing",
      concept: "This is a form of IT service that solves corporate management issues.\n\n1. **ASP (SaaS)**: A service provider that allows application software to be used via a network.\n2. **System Integration (SI)**: A service that collectively undertakes system planning, development, implementation, and maintenance.\n3. **Housing (colocation)**: A service in which a company rents its own communication lines and building space and stores customers' equipment. The customer owns the equipment (whereas hosting also rents the equipment).\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:35:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:36"] = {
    en: {
      title: "4-01 Network Devices and Topologies",
      concept: "This is the role of hardware equipment that connects networks.\n\n1. **LAN / WAN**: A limited network within the premises (LAN) and a wide area network (WAN) using public lines.\n2. **Hub (L2 switch)**: A device that relays data based on MAC address within the same network.\n3. **Router**: A device that connects different networks (e.g. LAN and Internet) and relays (**routing**) data to the best route based on IP address.\n4. **Gateway**: A device that connects networks with different communication protocols and mutually converts data.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:36:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:37"] = {
    en: {
      title: "4-02 Wireless LAN (Wi-Fi)",
      concept: "A LAN that uses radio waves to connect without using cables. The standard name is IEEE 802.11, commonly known as **Wi-Fi**.\n\n1. **SSID**: A name to identify the wireless access point to connect to.\n2. **Encryption Standard**: Communication is encrypted to prevent data leakage due to radio wave interception. The weak WEP is now being replaced by **WPA2** and the latest **WPA3**.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:37:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:38"] = {
    en: {
      title: "4-03 Communication Protocols",
      concept: "These are \"common rules\" for computers to communicate with each other via a network. The representative standard is **TCP/IP**.\n\n1. **TCP**: A reliable \"connection-oriented\" protocol that verifies data arrival and retransmits lost packets.\n2. **UDP**: A \"connectionless\" protocol that emphasizes speed and continues to send data unilaterally without confirming arrival (used for real-time video distribution, etc.).\n3. **Port number**: A number to identify the type of application (HTTP: number 80, HTTPS: number 443, etc.).\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:38:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:39"] = {
    en: {
      title: "4-04 How the Internet Works",
      concept: "A mechanism for address assignment and name resolution on the Internet.\n\n1. **IP Address**: Your computer's Internet address. There is 32-bit **IPv4** (with exhaustion issues) and 128-bit **IPv6**.\n2. **DNS**: A system that mutually converts (name resolution) domain names such as \"www.ipa.go.jp\" and machine-processed IP addresses such as \"210.146.x.x\".\n3. **DHCP**: A protocol that automatically assigns an IP address to a device when connecting to a network.\n4. **NAT (NAPT)**: A technology that mutually converts private IP addresses and global IP addresses and connects multiple devices to the Internet with one global address.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:39:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:40"] = {
    en: {
      title: "4-05 Network Communication Services",
      concept: "This is an infrastructure line service for connecting to the Internet.\n\n1. **FTTH**: Ultra-high speed wired communication that brings optical fiber directly into your home.\n2. **VPN (Virtual Private Network)**: A technology that uses encryption and other technologies to create a secure tunnel on the public Internet line, making it appear as if it were a private line for your company.\n3. **MVNO**: An operator that does not have its own line network and rents lines from other companies (major carriers) to provide cheap SIM communication services.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:40:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:41"] = {
    en: {
      title: "4-06 Web Page Technologies",
      concept: "A technology for viewing and creating websites.\n\n1. **HTML**: A markup language that describes the basic structure of a web page.\n2. **HTTP / HTTPS**: A protocol for exchanging data between a web browser and a web server. HTTPS encrypts communication contents (SSL/TLS) to prevent eavesdropping.\n3. **Cookie**: Text data that a website temporarily stores on the browser side in order to save user identification, login status, cart information, etc.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:41:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:42"] = {
    en: {
      title: "4-07 Email Protocols",
      concept: "A set of protocols for sending and receiving e-mail over the Internet.\n\n1. **SMTP**: A protocol for sending and transferring email between email servers.\n2. **POP3**: A protocol that downloads and manages e-mails addressed to you that arrive at the e-mail server to your PC or other terminal (by default, they are deleted from the server after being downloaded).\n3. **IMAP**: A protocol that allows you to read, write, and manage folders directly on the mail server without downloading emails to your own device (can be synchronized on multiple devices).\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:42:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:43"] = {
    en: {
      title: "5-01 Security Triad and Threats",
      concept: "1. **Three Elements of Information Security (CIA)**:\n   - **Confidentiality**: Only authorized people can access information.\n   - **Integrity**: The information has not been tampered with and is accurate.\n   - **Availability**: The availability of information whenever it is needed.\n2. **Main Malware**:\n   - **Ransomware**: Encrypts data without permission and demands ransom.\n   - **Trojan Horse**: Pretends to be a useful app and does malicious things behind the scenes.\n   - **Worm**: Self-replicates and spreads via network.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:43:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:44"] = {
    en: {
      title: "5-02 Common Cyberattacks",
      concept: "This is a network attack method used by a malicious third party.\n\n1. **DoS (DDoS) attack**: An attack that sends a large number of requests to overload a server and bring it out of service.\n2. **SQL injection**: An attack that fraudulently manipulates the database by entering malicious SQL into the input field of a website.\n3. **Cross-site scripting (XSS)**: An attack that embeds a malicious script in a vulnerable website and executes it on the browser of a third party who views it to steal cookies and other information.\n4. **Phishing**: The act of sending a fake email pretending to be from a bank etc., leading you to a fake website that looks just like the real thing, and tricking you into giving your personal information.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:44:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:45"] = {
    en: {
      title: "5-03 Information Security Management",
      concept: "A system by which an organization maintains and improves information security in a planned manner. The representative standard is called **ISMS (Information Security Management System)**.\n\nWe formulate the **Information Security Policy**, which is the highest security standard within the organization, and define the \"Information Security Measures Standards\", which are specific rules of conduct. Management operations will be continuously improved according to the PDCA cycle (Plan -> Do -> Check -> Act).\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:45:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:46"] = {
    en: {
      title: "5-04 Risk Management",
      concept: "It is the process of identifying and analyzing risks and selecting appropriate countermeasures.\n\n1. **Risk avoidance**: Eliminate risky operations themselves.\n2. **Risk reduction**: Reduce the probability of occurrence and impact through the introduction of security software and education.\n3. **Risk Transfer**: Transferring risk to someone else (e.g. taking out insurance, outsourcing a system).\n4. **Risk acceptance (retention)**: The cost of countermeasures is higher, so the risk is accepted as is.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:46:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:47"] = {
    en: {
      title: "5-05 User Authentication",
      concept: "This is a technology that verifies that the person attempting to log into the system is who he or she claims to be.\n\n1. **Three factors of authentication**: **Knowledge** (something the person knows: password), **Possession** (something the person has: IC card, one-time password token), **Biometric information** (physical characteristics of the person: fingerprint, face, veins). Combining two or more of these is called **multi-factor authentication**.\n2. **Single Sign-On (SSO)**: A mechanism that allows you to automatically log in to multiple linked systems and services with a single authentication.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:47:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:48"] = {
    en: {
      title: "5-06 Network Security",
      concept: "This is a defense measure to prevent attacks from external networks.\n\n1. **Firewall**: A wall that inspects the IP address and port number of communication packets and blocks inappropriate communication.\n2. **DMZ (Demilitarized Zone)**: An isolated area separated from the internal LAN (safety) and the Internet (dangerous) for locating servers for external publication (web, email, etc.).\n3. **WAF**: A firewall that inspects the contents of packets (HTTP data part) to prevent vulnerability attacks such as SQL injection into web applications.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:48:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:49"] = {
    en: {
      title: "5-07 Encryption Technologies",
      concept: "This is a technology that converts data so that it cannot be deciphered even if it is intercepted by a third party.\n\n1. **Common key cryptography**: Uses the same key for encryption and decryption. Although it is fast, there is a key distribution problem (difficulty in safely passing the key to the communication partner) (typical example: **AES**).\n2. **Public key cryptography**: Uses a pair of a \"public key\" that anyone can use and a \"private key\" that only the user has. There is no problem with key distribution, but the process is slow. Encrypt with **recipient's public key** and decrypt with **recipient's private key** (typical example: **RSA**).\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:49:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:50"] = {
    en: {
      title: "5-08 Digital Signatures and Certificate Authorities",
      concept: "This is a technology that proves the sender and prevents tampering.\n\n1. **Electronic signature (digital signature)**: The sender calculates a hash value from the data and encrypts (signs) it with the **sender's private key**. The recipient decrypts and verifies it with the sender's public key. This enables \"prevention of sender impersonation\" and \"data tampering detection (proof of integrity)\".\n2. **Certificate Authority (CA)**: A third-party organization that issues a \"digital certificate\" that certifies that a public key belongs to the principal.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:50:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:51"] = {
    en: {
      title: "6-01 Databases and SQL Basics",
      concept: "A system that organizes and efficiently manages large amounts of data without duplication is called a **DBMS (database management system)**, and currently the mainstream is **relational database (RDB)**, which handles data in tabular format.\n\n**SQL**, the standard language for data manipulation, has the following main syntax:\n- **SELECT**: Extract data (reference)\n- **INSERT**: Add data\n- **UPDATE**: Update data\n- **DELETE**: Delete data\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:51:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:52"] = {
    en: {
      title: "6-02 Database Design and ER Models",
      concept: "This is a design procedure for building a database. **E-R diagram** is used as a method to organize data structures in the real world.\n\n1. **Entity**: The entity being managed (e.g. \"customer\", \"product\"). Represented by a rectangle.\n2. **Relationship**: Association between entities (e.g. \"buy\"). Connect them with a line to indicate a one-to-many relationship (cardinality).\n3. **Key**: Define the **Primary Key** that uniquely identifies the record and the **Foreign Key** that associates with other tables.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:52:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:53"] = {
    en: {
      title: "6-03 Database Normalization",
      concept: "This is the process of partitioning tables and eliminating data duplication to prevent consistency errors (inconsistencies).\n\n1. **First normalization**: Eliminate multiple values ​​in table cells and reduce them to one value (atomic value).\n2. **Second normalization**: When the primary key has multiple columns (composite key), separate items that depend only on part of the primary key into a separate table (eliminating partial function dependencies).\n3. **Third normalization**: Separate items that depend on items other than the primary key into a separate table (eliminating transitive function dependencies).\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:53:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:54"] = {
    en: {
      title: "6-04 SQL Data Filtering and Logic",
      concept: "Use the SQL `WHERE` clause to filter data with complex conditions.\n\n- **AND (and)**: Extracted when both left and right conditions are \"true\".\n- **OR (or)**: Extracted when either the left or right condition is \"true\".\n- **NOT (not ~)**: Reverses \"true\" and \"false\" of the specified condition.\nThe order of priority of operations is `NOT` > `AND` > `OR`. Using parentheses `( )` gives the operation inside the brackets the highest priority.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:54:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:55"] = {
    en: {
      title: "6-05 SQL Sorting and Aggregation",
      concept: "This is the syntax for sorting the obtained results and aggregating them by group.\n\n1. **ORDER BY**: Sort the results. Specify **ASC** (ascending order: smallest first) or **DESC** (descending order: largest first).\n2. **GROUP BY**: Group records that have the same value in a particular column.\n3. **Aggregation functions**: Use a combination of **SUM** (sum), **AVG** (average), **COUNT** (row count), **MAX** / **MIN**, etc.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:55:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:56"] = {
    en: {
      title: "6-06 Transaction Processing and ACID",
      concept: "A series of atomic processing units in a database is called a transaction. The properties that transactions must satisfy are **ACID characteristics**.\n\n- **A (Atomic)**: Processing ends with either \"all execution\" or \"no execution\".\n- **C (Consistency)**: Data inconsistency does not occur before and after processing.\n- **I (Independence/Isolation)**: Even if multiple processes are performed at the same time, they will not be interfered with by others.\n- **D (Durability)**: Completed processing results are not lost even if there is a failure.\n**Lock** (exclusive control) is performed to prevent data collision during simultaneous execution.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:56:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:57"] = {
    en: {
      title: "7-01 Algorithms and Data Structures",
      concept: "1. **Algorithm**: A clear procedure for solving a particular problem. **Flowchart** etc. are used for description. Typical examples include **linear search**, **binary search**, and **bubble sort**.\n2. **Data structure**: A structure that efficiently handles data in memory. There are two types: **Stack** (LIFO: last in, first out; image of stacking dishes) and **Queue** (FIFO: first in, first out; image of a checkout line).\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:57:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:58"] = {
    en: {
      title: "7-02 Pseudo-language",
      concept: "This is a common notation standard for programs that appear on the IT Passport exam. It combines three basic control structures (sequential, selection, and repetition).\n\n- **Variable**: A box to temporarily save data.\n- **Array**: Multiple pieces of data arranged consecutively (specified by index number). Be careful about the start of the subscript (whether it starts from 0 or 1).\n- **Iteration**: Exit the loop when the loop termination condition is met.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:58:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:59"] = {
    en: {
      title: "7-03 Programming and Markup Languages",
      concept: "It is a language for creating systems and web pages.\n\n1. **Programming languages**: **Java** (operates independently of the OS), **Python** (mainstream for AI development and data analysis, simple syntax), **C language** (high speed, hardware controllable).\n2. **Compiler and interpreter**: A method that converts the source into machine language and executes it (compiler), and a method that executes it while interpreting it line by line (interpreter).\n3. **Markup language**: A language that structures data by surrounding it with tags. **HTML** (for web display), **XML** (users can define their own tags and are used for data exchange).\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:59:conceptJa"
    }
  };

  window.CONTENT_I18N["itpass:60"] = {
    en: {
      title: "8-01 Planning and Requirements Definition",
      concept: "This is the first stage of system development.\n\n1. **System planning process**: Develop a systemization concept based on management strategy.\n2. **Requirements definition process**: The process of clarifying the functions, performance, and security standards required for the system and agreeing with the users (most important).\n3. **RFP (Request for Proposal)**: A document in which the ordering party (company) requests the development vendor (IT company) to create a proposal for specific system construction. By presenting an RFP, fair and accurate vendor selection is possible.\n\n**Points for IT beginners:**\nThis field is asked very often in the IT Passport exam, so the shortcut to passing the exam is to not only define the keywords, but also organize related terms along with practical usage scenarios (examples).",
      needsReview: true,
      source: "manual-itpass-en-v1",
      sourceRef: "data/it_passport_lessons.js:60:conceptJa"
    }
  };
})();
