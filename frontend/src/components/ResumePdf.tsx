import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  // Sidebar
  sidebar: {
    width: '30%',
    backgroundColor: '#2E3B55',
    color: '#fff',
    padding: 20,
  },
  sidebarName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sidebarText: {
    marginBottom: 6,
  },
  sidebarSectionHeader: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: 'bold',
    borderBottom: '1 solid #fff',
    paddingBottom: 4,
    marginBottom: 8,
  },
  skillItem: {
    backgroundColor: '#ffffff',
    color: '#2E3B55',
    fontSize: 10,
    marginRight: 6,
    marginBottom: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // Main Content
  main: {
    width: '70%',
    padding: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    borderBottom: '1 solid #333',
    paddingBottom: 4,
    marginBottom: 6,
  },
  text: {
    marginBottom: 4,
  },
  item: {
    marginBottom: 10,
  },
});

const ResumePDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <Text style={styles.sidebarName}>{data.name}</Text>
        <Text style={styles.sidebarText}>{data.email}</Text>
        <Text style={styles.sidebarText}>{data.phone}</Text>
        <Text style={styles.sidebarText}>{data.city}</Text>

        <Text style={styles.sidebarSectionHeader}>Skills</Text>
        <View style={styles.skillContainer}>
          {data.skills.map((skill: string, index: number) => (
            <Text key={index} style={styles.skillItem}>{skill}</Text>
          ))}
        </View>
      </View>

      {/* Main */}
      <View style={styles.main}>
        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Professional Summary</Text>
          <Text style={styles.text}>{data.description}</Text>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Education</Text>
          {data.education.map((edu: any, index: number) => (
            <View key={index} style={styles.item}>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text> at {edu.institution}
              </Text>
              <Text style={styles.text}>{edu.startYear} - {edu.endYear}</Text>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Projects</Text>
          {data.projects.map((proj: any, index: number) => (
            <View key={index} style={styles.item}>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>{proj.name}</Text>
              </Text>
              <Text style={styles.text}>{proj.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
