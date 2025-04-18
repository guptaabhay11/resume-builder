import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

// Create styles
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sidebarText: {
    marginBottom: 8,
    fontSize: 11,
  },
  sidebarSectionHeader: {
    marginTop: 24,
    fontSize: 14,
    fontWeight: 'bold',
    borderBottom: '1 solid #fff',
    paddingBottom: 4,
    marginBottom: 10,
  },
  skillItem: {
    marginBottom: 6,
    display: 'flex',
    flexDirection: 'row',
  },
  skillBullet: {
    width: 10,
    marginRight: 5,
  },
  skillText: {
    flex: 1,
  },
  
  // Main Content
  main: {
    width: '70%',
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    borderBottom: '1 solid #2E3B55',
    color: '#2E3B55',
    paddingBottom: 4,
    marginBottom: 10,
  },
  text: {
    marginBottom: 4,
    lineHeight: 1.4,
  },
  item: {
    marginBottom: 12,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  itemSubtitle: {
    fontSize: 11,
    color: '#555555',
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 2,
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
        {data.skills.map((skill: string, index: number) => (
          <View key={index} style={styles.skillItem}>
            <Text style={styles.skillBullet}>•</Text>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
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
              <Text style={styles.itemTitle}>{edu.degree}</Text>
              <Text style={styles.itemSubtitle}>{edu.institution}</Text>
              <Text style={styles.dateRange}>{edu.startYear} - {edu.endYear}</Text>
            </View>
          ))}
        </View>
        
        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Projects</Text>
          {data.projects.map((proj: any, index: number) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemTitle}>{proj.name}</Text>
              <Text style={styles.text}>{proj.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default ResumePDF;